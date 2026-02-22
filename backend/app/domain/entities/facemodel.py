from typing import Optional
from pydantic import BaseModel

class FaceModel(BaseModel):
    name: Optional[str]
    encoding: list[float]
