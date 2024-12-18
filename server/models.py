from app import db


class Admin(db.Model):
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False) 
    role = db.Column(db.String(120), nullable=False) 
    shift = db.Column(db.String(120), nullable=False)
    sales = db.Column(db.Float, nullable=False)
    salary = db.Column(db.Float, nullable=False)
    is_paid = db.Column(db.Boolean, nullable=False, default=False)
    
    
    