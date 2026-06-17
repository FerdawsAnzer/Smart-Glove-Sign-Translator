import json
import numpy as np

FLEX_COLS = ['flex1', 'flex2', 'flex3', 'flex4', 'flex5']
IMU_COLS  = ['ax', 'ay', 'az', 'gx', 'gy', 'gz']

#  for each schema, load the normalization parameters from JSON files.
with open('artifacts/static_norm_params_new.json') as f:   
    STATIC_NORM = json.load(f)
with open('artifacts/dynamic_norm_params_new.json') as f:           
    DYNAMIC_NORM = json.load(f)


def _flex_minmax(norm, col):
    """Return (min, max) for a flex column under either JSON schema."""
    if 'flex_min' in norm and 'flex_max' in norm:
        return norm['flex_min'][col], norm['flex_max'][col]
    g = norm['global_ranges'][col]
    return g['min'], g['max']


def _imu_arrays(norm):
    """Return (mean, scale) as length-6 arrays in IMU_COLS order, any schema."""
    m = norm['imu_mean']
    mean = (np.array([m[c] for c in IMU_COLS], dtype=np.float32)
            if isinstance(m, dict) else np.asarray(m, dtype=np.float32))

    if 'imu_std' in norm:                       
        s = norm['imu_std']
        scale = (np.array([s[c] for c in IMU_COLS], dtype=np.float32)
                 if isinstance(s, dict) else np.asarray(s, dtype=np.float32))
    else:                                      
        scale = np.asarray(norm['imu_scale'], dtype=np.float32)

    scale = np.where(scale == 0, 1.0, scale)    
    return mean, scale


def normalize_window(raw_window: np.ndarray, sign_type: str) -> np.ndarray:
    """
    raw_window : (N, 11) raw rows in the fixed column order above.
    sign_type  : 'static' or 'dynamic' — selects the matching params.
    returns    : (N, 11) normalized, same column order.
    """
    norm = STATIC_NORM if sign_type == 'static' else DYNAMIC_NORM
    data = np.asarray(raw_window, dtype=np.float32).copy()

    # Flex per-column global min-max (0..1)
    for i, col in enumerate(FLEX_COLS):
        mn, mx = _flex_minmax(norm, col)
        rng = mx - mn
 # A near-zero training range means a dead sensor; map to neutral 0.5.
        data[:, i] = (data[:, i] - mn) / rng if rng > 5 else 0.5

 # IMU global StandardScaler (zero mean, unit variance)
    imu_mean, imu_scale = _imu_arrays(norm)
    data[:, 5:] = (data[:, 5:] - imu_mean) / imu_scale

    return data

def is_dynamic(raw_window: np.ndarray, threshold: float = 1500.0) -> bool:
    raw = np.asarray(raw_window, dtype=np.float32)
    gz_std = float(raw[:, 10].std())   
    return gz_std > threshold