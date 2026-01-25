def run_fit_engine(data):
    """
    Rule-based prototype for POV.
    Produces labeled outcomes for ML training later.
    """

    brand = data["brand"]
    usual_size = data["usual_size"]
    fit_preference = data["fit_preference"]

    sizes = ["S", "M", "L", "XL"]
    idx = sizes.index(usual_size)
    confidence = 0.80

    if fit_preference == "relaxed" and idx < len(sizes) - 1:
        idx += 1
        confidence -= 0.05

    if fit_preference == "tight" and idx > 0:
        idx -= 1
        confidence -= 0.05

    if brand.lower() in ["zara", "brand x"]:
        idx = min(idx + 1, len(sizes) - 1)
        confidence = 0.85

    recommended_size = sizes[idx]

    explanation = (
        f"Based on your preference for a {fit_preference} fit and "
        f"how this brand typically fits, size {recommended_size} "
        f"has the highest probability of being kept."
    )

    return recommended_size, confidence, explanation
