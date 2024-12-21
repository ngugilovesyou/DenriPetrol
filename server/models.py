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
    name = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(120), nullable=False, default="Attendant")
    shift = db.Column(db.String(120), nullable=False)
    sales = db.Column(db.Float, nullable=False)
    salary = db.Column(db.Float, nullable=False)
    is_paid = db.Column(db.Boolean, nullable=False, default=False)
    date_joined = db.Column(db.Date, nullable=False)


class Sales(db.Model):  # Fixed typo here
    __tablename__ = 'sales'
    id = db.Column(db.Integer, primary_key=True)
    fuel_type = db.Column(db.String(120), nullable=False)
    pump_number = db.Column(db.Integer, nullable=False)
    liters = db.Column(db.Float, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
