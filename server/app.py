import os
from datetime import timedelta, datetime
from flask import Flask, request, jsonify, session, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS  # Added CORS for cross-origin requests
from datetime import datetime

from models import db,User, Employee, Sales, Fuel, Order, Supplier
# Create Flask app and API
app = Flask(__name__)
api = Api(app)

# Enable CORS for all domains (you may want to restrict this to specific domains in production)
CORS(app, origins="http://localhost:5173")


# Load configuration settings
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Use environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///denripetrol.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)
# app.config['SQLALCHEMY_BINDS'] = True

# Initialize the database
db.init_app(app)
migrate = Migrate(app, db)

# --------------------- User Endpoints ---------------------
class UserResource(Resource):
    def post(self):
        data = request.get_json()

        # Validate required fields
        required_fields = ['first_name', 'last_name', 'email', 'password']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return {'message': f'Missing fields: {", ".join(missing_fields)}'}, 400

        # Check if User already exists by email
        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400

        # Create new User
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=generate_password_hash(data['password'], method='pbkdf2:sha256') ,
            date_joined = datetime.now()
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'User created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            # Log the error for debugging purposes (optional)
            app.logger.error(f'Error creating user: {str(e)}')
            return {'message': 'Error creating user'}, 500
        
class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()

        # Validate input
        if not data.get('email') or not data.get('password'):
            return {'message': 'Email and password are required'}, 400

        # Query for the user by email
        user = User.query.filter_by(email=data['email']).first()

        if user and check_password_hash(user.password, data['password']):
            # Set session for the user
            session['user_id'] = user.id
            session.permanent = True  # Session lasts as per `PERMANENT_SESSION_LIFETIME`

            return user.to_dict(), 200

        return {'message': 'Invalid email or password'}, 401

# --------------------- Employee Endpoints ---------------------
class EmployeeResource(Resource):
    def get(self):
        employees = Employee.query.all()
        return jsonify([employee.to_dict() for employee in employees])

    def post(self):
        data = request.get_json()
        print("Received data:", data)
        required_fields = ['first_name', 'last_name', 'email','phone_number', 'role', 'shift', 'sales', 'salary']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400
        # salary = int(data['salary'].replace(',', '')) if 'salary' in data else 0
        new_employee = Employee(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone_number=data['phone_number'],
            role=data['role'],
            shift=data['shift'],
            sales=data.get('sales', 0),
            salary=data['salary'],
            date_joined = datetime.now(),
            
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
    def patch(self, id):
        data=request.get_json()
        employee = Employee.query.get(id)
        if not employee:
            return {'message': 'Employee not found'}, 404
        sales=data['sales']
        employee.sales = sales
        db.session.commit()
        return jsonify(employee.to_dict())

    def delete(self, id):
        employee = Employee.query.get(id)
        if not employee:
            return {'message': 'Employee not found'}, 404

        db.session.delete(employee)
        db.session.commit()

        return {'message': 'Employee deleted successfully'}, 200
# --------------------- Fuel Endpoints ---------------------
class FuelResource(Resource):
    def get(self):
        fuels = Fuel.query.all()
        return jsonify([fuel.to_dict() for fuel in fuels])

class FuelById(Resource):
    def patch(self, id):  
        data = request.get_json()
       
        fuel = Fuel.query.get(id) 
        
        if not fuel:
            return {'message': 'Fuel not found'}, 404  

        # Update fuel data if provided
        if "level" in data:
            fuel.level = data["level"]
        if "price" in data:
            fuel.price = data["price"]

        try:
            db.session.commit()  
            return fuel.to_dict(), 200 
        except Exception as e:
            db.session.rollback()  
            return {'message': f'Error updating fuel: {str(e)}'}, 500 
          
# --------------------- Sales Endpoints ---------------------
class SalesResource(Resource):
    def get(self):
        sales = Sales.query.all()
        return jsonify([sale.to_dict() for sale in sales])
    def post(self):
        try:
            data = request.get_json()

            # Validate required fields
            required_fields = ['fuel_type', 'pump', 'litres', 'employee_id', 'time']
            for field in required_fields:
                if field not in data or not data[field]:
                    return {'message': f'{field} is required'}, 400

            # Parse and validate date
            try:
                date = datetime.strptime(data.get('date', datetime.utcnow().strftime("%Y-%m-%d")), "%Y-%m-%d").date()
            except ValueError:
                return {'message': 'Invalid date format. Use YYYY-MM-DD.'}, 400

            # Parse and validate time
            try:
                time = datetime.strptime(data['time'], "%H:%M").time()
            except ValueError:
                return {'message': 'Invalid time format. Use HH:MM.'}, 400

            # Create a new Sale record
            new_sale = Sales(
                fuel_type=data['fuel_type'],
                pump=data['pump'],
                date=date,
                time=time,
                litres=float(data['litres']),
                total_cost=float(data.get('total_cost', 0.0)),  
                employee_id=int(data['employee_id'])
            )

            # Add to the database
            db.session.add(new_sale)
            db.session.commit()

            return {'message': 'Sale recorded successfully', 'sale_id': new_sale.id}, 201

        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}, 500
        
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

class OrderResource(Resource):
    def get(self):
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders])
    
    def post(self):
        data = request.get_json()

        required_fields = ['fuel_type', 'supplier', 'estimated_delivery_date']
        for field in required_fields:
            if field not in data or not data[field]:
                return {'message': f'{field} is required'}, 400

        new_order = Order(
            fuel_type=data['fuel_type'],
            supplier = data['supplier'],
            status="Pending",
            estimated_delivery_date=['estimated_delivery_date']
        )
        try:
            db.session.add(new_order)
            db.session.commit()
            return {'message': 'Order created successfully', 'order_id': new_order.id}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating order: {str(e)}'}, 500

class OrderById(Resource):
    def patch(self, id):
        order = Order.query.get(id)
        if not order:
            return {'message': 'Order not found'}, 404

        data = request.get_json()

        order.status = data.get('status', order.status)

        db.session.commit()
        return jsonify(order.to_dict()) 

class SupplierResource(Resource):
    def get(self):
        suppliers = Supplier.query.all()
        return jsonify([supplier.to_dict() for supplier in suppliers])       
# API Routes Setup
api.add_resource(UserResource, '/users')

api.add_resource(UserLoginResource, '/users/login')
api.add_resource(EmployeeResource, '/employees')
api.add_resource(EmployeeSingleResource, '/employees/<int:id>')
api.add_resource(SalesResource, '/sales')
api.add_resource(SalesSingleResource, '/sales/<int:id>')
api.add_resource(FuelResource, '/fuel')  
api.add_resource(FuelById, '/fuel/<int:id>')
api.add_resource(OrderResource, '/orders')
api.add_resource(OrderById, '/orders/<int:id>')
api.add_resource(SupplierResource, '/suppliers')
if __name__ == '__main__':
    app.run(debug=True)

