import cv2
import numpy as np
import base64
from ultralytics import YOLO

model = YOLO("yolov8n.pt")  

def decode_base64_image(img_base64: str) -> np.ndarray:
    header, encoded = img_base64.split(",", 1)
    nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def detect_objects(img: np.ndarray):

    results = model(img)[0]
    objects = []

    for box, cls_id, conf in zip(results.boxes.xyxy, results.boxes.cls, results.boxes.conf):
        cls_id = int(cls_id)
        if cls_id in [0, 67]:
            x1, y1, x2, y2 = map(int, box)
            objects.append([x1, y1, x2 - x1, y2 - y1, cls_id])
    return objects
