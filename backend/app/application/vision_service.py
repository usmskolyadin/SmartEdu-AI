from app.infrastructure.ml.yolo_service import yolo_service


class VisionService:

    @staticmethod
    def process_frame(frame_base64: str):
        img = yolo_service.decode_base64_image(frame_base64)
        detections = yolo_service.detect(img)
        return detections


vision_service = VisionService()