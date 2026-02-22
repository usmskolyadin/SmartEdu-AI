from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WS_PATH: str = "/ws"
    FACE_TOLERANCE: float = 0.6
    YOLO_COCO_MODEL_PATH: str = "app/infrastructure/ml/weights/yolov8n.pt"
    # YOLO_PHONE_MODEL_PATH: str = "app/infrastructure/ml/weights/phone_best.pt"
    YOLO_PERSON_CONF: float = 0.25
    YOLO_PHONE_CONF: float = 0.25


settings = Settings()