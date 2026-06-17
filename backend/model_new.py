"""
model.py — static + dynamic inference.

IMPORTANT: predict() does NOT re-decide static vs dynamic. main.py's
SessionBuffer already made that call (gz_std OR accmag_std) and sends:
    • exactly 10 rows  -> static
    • >= 40 rows       -> dynamic
So we route on the buffer the router handed us, not on a gy threshold.
Re-deciding here with gy would misroute translational signs (WRITE, EAT,
SLEEP) back to the static model — the exact signs main.py works to catch.
"""
import json
import numpy as np
import keras
from keras.models import load_model
from preprocessing_new import normalize_window

# Artifact filenames MUST match what your notebooks actually saved
# Your static notebook saves the *_flex2_s.* files; confirm the dynamic names.
STATIC_MODEL   = "artifacts/static_model_new.keras"
STATIC_LABELS  = "artifacts/static_label_map_new.json"
DYNAMIC_MODEL  = "artifacts/dynamic_model_new.keras"        
DYNAMIC_LABELS = "artifacts/dynamic_label_map_new.json"     

print("Loading models...")
static_model  = load_model(STATIC_MODEL)
dynamic_model = load_model(DYNAMIC_MODEL)
with open(STATIC_LABELS)  as f: static_labels  = json.load(f)
with open(DYNAMIC_LABELS) as f: dynamic_labels = json.load(f)
print("✅ Models loaded successfully!")

# Constants 
CONFIDENCE_THRESHOLD = 0.70
STATIC_TIMESTEPS     = 10    # static model expects exactly 10 rows
DYNAMIC_TIMESTEPS    = 40    # dynamic model expects exactly 40 rows


def predict(raw_window: np.ndarray, sign_type: str | None = None):
    try:
        raw_window = np.asarray(raw_window, dtype=np.float32)

        # Step 1  trust the router's decision (by length); do NOT re-decide.
        if sign_type is None:
            sign_type = "dynamic" if len(raw_window) >= DYNAMIC_TIMESTEPS else "static"

        if sign_type == "dynamic":
            model, labels, timesteps = dynamic_model, dynamic_labels, DYNAMIC_TIMESTEPS
        else:
            model, labels, timesteps = static_model, static_labels, STATIC_TIMESTEPS

        # Step 2 validate enough rows were collected.
        if len(raw_window) < timesteps:
            print(f"❌ Not enough samples: got {len(raw_window)}, need {timesteps}")
            return None

        # Step 3  slice to the model's expected window size.
        window_raw = raw_window[:timesteps]

        # Step 4 normalize with the params for THIS sign type.
        # (preprocessing.normalize_window must branch on sign_type and
        # use the matching static/dynamic norm params.)
        window_norm = normalize_window(window_raw, sign_type)

        # Step 5  reshape. Use -1 so the feature count comes from the data,
        # never a hardcoded 11 (which broke before on feature drift).
        X = window_norm.reshape(1, timesteps, -1).astype(np.float32)

        # Step 6  predict.
        probs      = model.predict(X, verbose=0)[0]
        pred_idx   = int(probs.argmax())
        confidence = float(probs[pred_idx])
        pred_label = labels[str(pred_idx)]
        print(f"🤖 Prediction ({sign_type}): {pred_label} ({confidence:.2f})")

        # Step 7 — confidence gate.
        if confidence < CONFIDENCE_THRESHOLD:
            return {"prediction": "unknown", "confidence": round(confidence, 3)}
        return {"prediction": pred_label, "confidence": round(confidence, 3)}

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return None