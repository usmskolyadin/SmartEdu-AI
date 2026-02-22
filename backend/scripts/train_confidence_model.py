import pandas as pd
import joblib
from lightgbm import LGBMClassifier
from sklearn.model_selection import train_test_split

FEATURES = [
    "raw_conf",
    "bbox_area",
    "aspect_ratio",
    "img_area_ratio",
    "center_x",
    "center_y",
    "num_detections",
    "class_id",
    "person_iou"
]

df = pd.read_csv("dataset_confidence.csv")

X = df[FEATURES]
y = df["label"]

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)

model = LGBMClassifier(n_estimators=200, max_depth=6)
model.fit(X_train, y_train)

print("VAL SCORE:", model.score(X_val, y_val))

joblib.dump(model, "app/infrastructure/ml/weights/confidence_model.pkl")