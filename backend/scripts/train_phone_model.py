from ultralytics import YOLO

def train():
    model = YOLO("yolov8n.pt")

    model.train(
        data="infrastructure/ml/datasets/phone_dataset/phones.yaml",
        epochs=50,
        imgsz=640,
        batch=16,
        project="infrastructure/ml/weights",
        name="phone_detector",
        exist_ok=True
    )

if __name__ == "__main__":
    train()