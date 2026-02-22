import base64
import cv2
import numpy as np
from ultralytics import YOLO
from app.core.config import settings


class YoloService:
    def __init__(self):
        self.model = YOLO(settings.YOLO_COCO_MODEL_PATH)

    @staticmethod
    def decode_base64_image(img_base64: str) -> np.ndarray:
        header, encoded = img_base64.split(",", 1)
        nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
        return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    def detect(self, img: np.ndarray):
        detections = []

        results = self.model(img, conf=settings.YOLO_PERSON_CONF, verbose=False)[0]

        for box, cls_id, conf in zip(results.boxes.xyxy, results.boxes.cls, results.boxes.conf):
            x1, y1, x2, y2 = map(int, box)
            cls_id = int(cls_id)

            if cls_id == 0:
                detections.append({
                    "x": x1,
                    "y": y1,
                    "w": x2 - x1,
                    "h": y2 - y1,
                    "type": "person",
                    "conf": float(conf)
                })

            elif cls_id == 67:
                detections.append({
                    "x": x1,
                    "y": y1,
                    "w": x2 - x1,
                    "h": y2 - y1,
                    "type": "phone",
                    "conf": float(conf)
                })

        return detections
    
yolo_service = YoloService()