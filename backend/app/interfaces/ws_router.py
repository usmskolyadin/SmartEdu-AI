from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.application.vision_service import vision_service

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            frame_base64 = await ws.receive_text()
            detections = vision_service.process_frame(frame_base64)

            payload = [
                [int(d["x"]), int(d["y"]), int(d["w"]), int(d["h"]), d["type"], float(d["conf"])]
                for d in detections
            ]

            await ws.send_json({"objects": payload})
    except WebSocketDisconnect:
        pass
    except Exception as e:
        print("WS error:", e)
        await ws.close()