from flask import Flask
import os
from .extensions import db  # <--- Import from extensions
# from .models import FitPrediction # Don't import models here yet

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object("config.Config")

    # App configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '8c568937f79e5cc394a108a28ae6093d'
    
    # Initialize the extension with THIS app
    db.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    with app.app_context():
        # This now works because the db instance is correctly linked
        db.create_all()

    return app