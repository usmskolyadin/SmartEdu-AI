from fastapi import FastAPI
from app.presentation import ws_router

app = FastAPI(title="EduAI Backend")

app.include_router(ws_router.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
