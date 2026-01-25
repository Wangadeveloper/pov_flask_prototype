from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField
from wtforms.validators import DataRequired

class FitForm(FlaskForm):
    brand = StringField("Brand", validators=[DataRequired()])

    category = SelectField(
        "Category",
        choices=[
            ("tshirt", "T-Shirt"),
            ("trousers", "Trousers"),
            ("jacket", "Jacket")
        ]
    )

    usual_size = SelectField(
        "Usual Size",
        choices=[("S", "S"), ("M", "M"), ("L", "L"), ("XL", "XL")]
    )

    fit_preference = SelectField(
        "Fit Preference",
        choices=[
            ("tight", "Tight"),
            ("regular", "Regular"),
            ("relaxed", "Relaxed")
        ]
    )

    submit = SubmitField("Check Fit")
