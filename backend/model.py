import json
import joblib
import numpy as np

# Load the artifacts of teh trained model  once when server starts  to avoid loading it each time we reciedv data and make prediction faster
model = joblib.load("artifacts/test_model_knn.pkl")
scaler = joblib.load("artifacts/test_scaler.pkl")

with open("artifacts/test_feature_columns.json") as f:
    feature_columns = json.load(f)

with open("artifacts/test_iqr_bounds.json") as f:
    iqr_bounds = json.load(f)

print("✅ Model loaded successfully!")

#  Map ESP32 keys to be the same as the ones we used  in the trained model incase there was a diffrence
# fake data 
KEY_MAP = {
    "flex1": "FLEX_THUMB",
    "flex2": "FLEX_INDEX",
    "flex3": "FLEX_MIDDLE",
    "flex4": "FLEX_RING",
    "flex5": "FLEX_LITTLE",
    "acc_x": "ACC_X",
    "acc_y": "ACC_Y",
    "acc_z": "ACC_Z",
    "gyro_x": "GYRO_X",
    "gyro_y": "GYRO_Y",
    "gyro_z": "GYRO_Z"
}

# ── Remove bad sensor values ──────────────────────────────────
def clip_outliers(data: dict) -> dict:
    clipped = {}
    for key, value in data.items():
        bounds = iqr_bounds.get(key)
        if bounds:
            clipped[key] = max(bounds["lower"], min(bounds["upper"], value))
        else:
            clipped[key] = value
    return clipped

# ── Main predict function ─────────────────────────────────────
async def predict(raw_data: dict):
    try:
        # 1. rename keys
        mapped_data = {KEY_MAP[k]: v for k, v in raw_data.items() if k in KEY_MAP}

        # 2. clean bad values
        cleaned_data = clip_outliers(mapped_data)

        # 3. arrange in correct order
        features = [cleaned_data[col] for col in feature_columns]

        # 4. convert to numpy array
        features_array = np.array(features).reshape(1, -1)

        # 5. scale
        scaled = scaler.transform(features_array)

        # 6. predict
        prediction = model.predict(scaled)[0]

        # 7. get confidence
        confidence = model.predict_proba(scaled)[0].max()

        print(f"🤖 Prediction: {prediction} ({confidence:.2f})")
        return (str(prediction), float(confidence))

    except Exception as e:
       
        print(f"❌ Prediction error: {e}")
            
        return None