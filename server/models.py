from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    date_joined = db.Column(db.Date)

    # Relationship to Employee
    employee = db.relationship('Employee', backref='user', uselist=False)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.first_name + ' ' + self.last_name,
            'email': self.email,
            'is_admin': self.is_admin,
            'date_joined': self.date_joined.strftime('%Y-%m-%d')
        }

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(100))
    phone_number = db.Column(db.String(15))
    shift = db.Column(db.String(50))
    sales = db.Column(db.String, default=0)
    salary = db.Column(db.String)
    is_paid = db.Column(db.Boolean, default=False)
    date_joined = db.Column(db.Date, default=datetime.now)

    # Foreign key to the User model
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    # Relationship to Sales
    sales_data = db.relationship('Sales', back_populates='employee', lazy=True)

    def __repr__(self):
        return f'<Employee {self.first_name} {self.last_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.first_name + ' ' + self.last_name,
            'role': self.role,
            'shift': self.shift,
            'sales': self.sales,
            'salary': self.salary,
            'is_paid': self.is_paid,
            'date_joined': self.date_joined.strftime('%Y-%m-%d')
        }

class Sales(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fuel_type = db.Column(db.String(50))
    pump = db.Column(db.String(50))
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    litres = db.Column(db.Float)
    total_cost = db.Column(db.Float)

    # Foreign key to Employee
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    employee = db.relationship('Employee', back_populates='sales_data', lazy=True)
    
    def __repr__(self):
        return f'<Sales {self.fuel_type} {self.litres} litres>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'fuel_type': self.fuel_type,
            'pump': self.pump,
            'date': self.date.strftime('%Y-%m-%d'),
            'time': self.time.strftime('%H:%M:%S'),
            'litres': self.litres,
            'total_cost': self.total_cost,
            'employee_id': self.employee_id,
            'employee_name': f'{self.employee.first_name} {self.employee.last_name}' if self.employee else 'No Employee'
        }

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))

    def __repr__(self):
        return f'<Supplier {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fuel_type = db.Column(db.String(50))
    supplier = db.Column(db.String(100))
    status = db.Column(db.String(50))
    estimated_delivery_date = db.Column(db.Date)

    def __repr__(self):
        return f'<Order {self.fuel_type} {self.status}>'
    def to_dict(self):
        return {
            'id': self.id,
            'fuel_type': self.fuel_type,
            'supplier': self.supplier,
            'status': self.status,
            'estimated_delivery_date': self.estimated_delivery_date.strftime('%Y-%m-%d  %H:%M:%S')

        }

class Fuel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fuel_type = db.Column(db.String(50))
    level = db.Column(db.Integer)
    price = db.Column(db.Float)

    def __repr__(self):
        return f'<Fuel {self.fuel_type}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'fuel_type': self.fuel_type,
            'level': self.level,
            'price': self.price
        }
