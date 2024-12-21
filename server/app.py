import os
from datetime import timedelta, datetime
from flask import Flask, request, jsonify, session, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS  # Added CORS for cross-origin requests

# Create Flask app and API
app = Flask(__name__)
api = Api(app)

# Enable CORS for all domains (you may want to restrict this to specific domains in production)
CORS(app)

# Load configuration settings
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')  # Use environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///yourdatabase.db')  # Use environment variable
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)

# Initialize the database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'shift': self.shift,
            'sales': self.sales,
            'salary': self.salary,
            'is_paid': self.is_paid,
            'date_joined': self.date_joined.isoformat()  # Return date as ISO string
        }

class Sales(db.Model):
    __tablename__ = 'sales'

    id = db.Column(db.Integer, primary_key=True)
    fuel_type = db.Column(db.String(120), nullable=False)
    pump_number = db.Column(db.Integer, nullable=False)
    liters = db.Column(db.Float, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'fuel_type': self.fuel_type,
            'pump_number': self.pump_number,
            'liters': self.liters,
            'employee_id': self.employee_id
        }

# --------------------- Admin Endpoints ---------------------
class AdminResource(Resource):
    def post(self):
        data = request.get_json()

        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        # Check if admin already exists
        if Admin.query.filter_by(username=data['username']).first():
            return {'message': 'Username already exists'}, 400
        if Admin.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400

        # Create new admin
        new_admin = Admin(
            username=data['username'],
            email=data['email'],
            password=generate_password_hash(data['password'], method='pbkdf2:sha256')  
        )

        try:
            db.session.add(new_admin)
            db.session.commit()
            return {'message': 'Admin created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating admin: {str(e)}'}, 500

class AdminLoginResource(Resource):
    def post(self):
        data = request.get_json()

        if not data.get('email') or not data.get('password'):
            return {'message': 'Email and password are required'}, 400

        admin = Admin.query.filter_by(email=data['email']).first()

        if admin and check_password_hash(admin.password, data['password']):
            # Set session
            session['admin_id'] = admin.id
            session.permanent = True  # Session lasts as per PERMANENT_SESSION_LIFETIME

            return {'message': 'Login successful', 'admin_id': admin.id}, 200

        return {'message': 'Invalid email or password'}, 401

# --------------------- Employee Endpoints ---------------------
class EmployeeResource(Resource):
    def get(self):
        employees = Employee.query.all()
        return jsonify([employee.to_dict() for employee in employees])

    def post(self):
        data = request.get_json()

        required_fields = ['name', 'role', 'shift', 'sales', 'salary', 'date_joined']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        new_employee = Employee(
            name=data['name'],
            role=data['role'],
            shift=data['shift'],
            sales=data['sales'],
            salary=data['salary'],
            date_joined=datetime.strptime(data['date_joined'], '%Y-%m-%d').date()
        )

        try:
            db.session.add(new_employee)
            db.session.commit()
            return {'message': 'Employee created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating employee: {str(e)}'}, 500

class EmployeeSingleResource(Resource):
    def get(self, id):
        employee = Employee.query.get(id)
        if not employee:
            return {'message': 'Employee not found'}, 404
        return jsonify(employee.to_dict())

    def put(self, id):
        employee = Employee.query.get(id)
        if not employee:
            return {'message': 'Employee not found'}, 404

        data = request.get_json()

        employee.name = data.get('name', employee.name)
        employee.role = data.get('role', employee.role)
        employee.shift = data.get('shift', employee.shift)
        employee.sales = data.get('sales', employee.sales)
        employee.salary = data.get('salary', employee.salary)
        employee.is_paid = data.get('is_paid', employee.is_paid)

        db.session.commit()
        return jsonify(employee.to_dict())

    def delete(self, id):
        employee = Employee.query.get(id)
        if not employee:
            return {'message': 'Employee not found'}, 404

        db.session.delete(employee)
        db.session.commit()

        return {'message': 'Employee deleted successfully'}, 200

# --------------------- Sales Endpoints ---------------------
class SalesResource(Resource):
    def get(self):
        sales = Sales.query.all()
        return jsonify([sale.to_dict() for sale in sales])

    def post(self):
        data = request.get_json()

        required_fields = ['fuel_type', 'pump_number', 'liters', 'employee_id']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        new_sale = Sales(
            fuel_type=data['fuel_type'],
            pump_number=data['pump_number'],
            liters=data['liters'],
            employee_id=data['employee_id']
        )

        try:
            db.session.add(new_sale)
            db.session.commit()
            return {'message': 'Sale created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating sale: {str(e)}'}, 500

class SalesSingleResource(Resource):
    def get(self, id):
        sale = Sales.query.get(id)
        if not sale:
            return {'message': 'Sale not found'}, 404
        return jsonify(sale.to_dict())

    def put(self, id):
        sale = Sales.query.get(id)
        if not sale:
            return {'message': 'Sale not found'}, 404

        data = request.get_json()

        sale.fuel_type = data.get('fuel_type', sale.fuel_type)
        sale.pump_number = data.get('pump_number', sale.pump_number)
        sale.liters = data.get('liters', sale.liters)

        db.session.commit()
        return jsonify(sale.to_dict())

    def delete(self, id):
        sale = Sales.query.get(id)
        if not sale:
            return {'message': 'Sale not found'}, 404

        db.session.delete(sale)
        db.session.commit()

        return {'message': 'Sale deleted successfully'}, 200

# API Routes Setup
api.add_resource(AdminResource, '/admins')
api.add_resource(AdminLoginResource, '/admins/login')
api.add_resource(EmployeeResource, '/employees')
api.add_resource(EmployeeSingleResource, '/employees/<int:id>')
api.add_resource(SalesResource, '/sales')
api.add_resource(SalesSingleResource, '/sales/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)
