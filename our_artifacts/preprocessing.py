"""
preprocessing.py
Normalizes raw glove sensor data before model prediction.
No calibration needed — uses global ranges computed from training data.
"""

import numpy as np
import json

with open('static_norm_params.json') as f:
    STATIC_NORM = json.load(f)

with open('dynamic_norm_params.json') as f:
    DYNAMIC_NORM = json.load(f)

FLEX_COLS    = ['flex1', 'flex2', 'flex3', 'flex4', 'flex5']
IMU_COLS     = ['ax', 'ay', 'az', 'gx', 'gy', 'gz']
FEATURE_COLS = FLEX_COLS + IMU_COLS  # 11 features total


def normalize_window(raw_window: np.ndarray, sign_type: str) -> np.ndarray:
    """
    Normalize a raw sensor window using global parameters from training.

    Args:
        raw_window : np.ndarray shape (N, 11) — raw values from ESP32
                     column order: flex1,flex2,flex3,flex4,flex5,ax,ay,az,gx,gy,gz
        sign_type  : 'static' or 'dynamic'

    Returns:
        Normalized np.ndarray of same shape, ready for model input.
    """
    norm   = STATIC_NORM if sign_type == 'static' else DYNAMIC_NORM
    data   = raw_window.astype(np.float32).copy()
    ranges = norm['global_ranges']

    # Flex sensors — global min-max normalization
    for i, col in enumerate(FLEX_COLS):
        mn  = ranges[col]['min']
        mx  = ranges[col]['max']
        rng = mx - mn
        # If sensor range is too small (<5) it is unreliable — set neutral 0.5
        data[:, i] = (data[:, i] - mn) / rng if rng > 5 else 0.5

    # IMU — global StandardScaler
    imu_mean  = np.array(norm['imu_mean'])
    imu_scale = np.array(norm['imu_scale'])
    data[:, 5:] = (data[:, 5:] - imu_mean) / imu_scale

    return data


def is_dynamic(raw_window: np.ndarray, threshold: float = 2000.0) -> bool:
    """
    Decide if the gesture is dynamic (moving) or static (held still).
    Uses gyroscope Y-axis standard deviation — the most reliable indicator.

    Static signs:  gy_std =   350 –   575  (hand held still)
    Dynamic signs: gy_std = 13000 +        (wrist rotating)
    Threshold 2000 gives 20-30x safety margin between both groups.

    Args:
        raw_window : RAW (un-normalized) np.ndarray shape (N, 11)
        threshold  : gy_std above this = dynamic sign

    Returns:
        True if dynamic, False if static.
    """
    gy_std = float(raw_window[:, 9].std())   # col 9 = gy
    gz_std = float(raw_window[:, 10].std())  # col 10 = gz
    return gy_std > threshold or gz_std > threshold
