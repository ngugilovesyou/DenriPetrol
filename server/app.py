import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure app settings using environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

@app.route('/api')
def index():
    return '<h1>Index of Denri Petrol System</h1>'

if __name__ == '__main__':
    app.run(debug=True, port=5555)
