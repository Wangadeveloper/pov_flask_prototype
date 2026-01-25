from flask import Blueprint, render_template, request, jsonify
from .forms import FitForm  # Ensure this matches your file name (forms.py vs form.py)
from .models import FitPrediction
from .extensions import db
from .fit_engine import run_fit_engine

main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def index():
    # 1. Check if the request is sending JSON (from our JS fetch)
    if request.is_json:
        form = FitForm(data=request.get_json())
    else:
        form = FitForm()

    # 2. validate_on_submit() will now find the data and the CSRF token
    if form.validate_on_submit():
        recommended_size, confidence, explanation = run_fit_engine({
            "brand": form.brand.data,
            "category": form.category.data,
            "usual_size": form.usual_size.data,
            "fit_preference": form.fit_preference.data
        })

        prediction = FitPrediction(
            brand=form.brand.data,
            category=form.category.data,
            usual_size=form.usual_size.data,
            fit_preference=form.fit_preference.data,
            recommended_size=recommended_size,
            confidence=confidence
        )
        db.session.add(prediction)
        db.session.commit()

        return jsonify({
            "size": recommended_size,
            "confidence": confidence,
            "explanation": explanation
        })

    # 3. If validation fails for JSON requests, return the specific errors
    if request.method == "POST" and request.is_json:
        return jsonify({"errors": form.errors}), 400

    return render_template("index.html", form=form, result=None)