import base64
import cv2
import numpy as np
from ultralytics import YOLO
from app.core.config import settings


class YoloService:
    def __init__(self):
        self.person_model = YOLO(settings.YOLO_COCO_MODEL_PATH)
        self.phone_model = YOLO(settings.YOLO_PHONE_MODEL_PATH)

    @staticmethod
    def decode_base64_image(img_base64: str) -> np.ndarray:
        header, encoded = img_base64.split(",", 1)
        nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
        return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    def detect(self, img: np.ndarray):
        detections = []

        res_person = self.person_model(img, conf=settings.YOLO_PERSON_CONF, verbose=False)[0]
        for box, cls_id, conf in zip(res_person.boxes.xyxy, res_person.boxes.cls, res_person.boxes.conf):
            if int(cls_id) == 0:
                x1, y1, x2, y2 = map(int, box)
                detections.append({
                    "x": x1,
                    "y": y1,
                    "w": x2 - x1,
                    "h": y2 - y1,
                    "type": "person",
                    "conf": float(conf)
                })

        res_phone = self.phone_model(img, conf=settings.YOLO_PHONE_CONF, verbose=False)[0]
        for box, cls_id, conf in zip(res_phone.boxes.xyxy, res_phone.boxes.cls, res_phone.boxes.conf):
            x1, y1, x2, y2 = map(int, box)
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