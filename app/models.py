from .extensions import db
from datetime import datetime

class FitPrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    brand = db.Column(db.String(100))
    category = db.Column(db.String(50))
    usual_size = db.Column(db.String(10))
    fit_preference = db.Column(db.String(20))

    recommended_size = db.Column(db.String(10))
    confidence = db.Column(db.Float)

    outcome = db.Column(db.String(20), nullable=True)
    # kept / returned / exchanged (future)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
