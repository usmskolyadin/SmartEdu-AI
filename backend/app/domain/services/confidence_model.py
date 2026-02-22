from abc import ABC, abstractmethod
from typing import Dict

class ConfidenceModel(ABC):
    @abstractmethod
    def predict(self, features: Dict) -> float:
        pass