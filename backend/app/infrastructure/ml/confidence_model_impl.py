import joblib
import numpy as np
from app.domain.services.confidence_model import ConfidenceModel
from app.core.config import settings

FEATURE_ORDER = [
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

class SklearnConfidenceModel(ConfidenceModel):
    def __init__(self):
        self.model = joblib.load(settings.CONFIDENCE_MODEL_PATH)

    def predict(self, features: dict) -> float:
        vec = np.array([[features.get(f, 0.0) for f in FEATURE_ORDER]])
        prob = self.model.predict_proba(vec)[0][1]
        return float(prob)


confidence_model = SklearnConfidenceModel()