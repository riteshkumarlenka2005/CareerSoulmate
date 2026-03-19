"""
Dropout Prediction Service
Predicts student dropout risk based on various factors
"""

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class PredictionRequest(BaseModel):
    student_id: str
    attendance_rate: float
    grade_average: float
    engagement_score: float
    socioeconomic_factors: dict

@app.post("/predict/dropout")
async def predict_dropout(request: PredictionRequest):
    """
    Predict dropout risk for a student
    """
    # TODO: Load model and make prediction
    return {
        "risk_level": "low",
        "probability": 0.0,
        "factors": []
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
