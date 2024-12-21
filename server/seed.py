from app import app, db
from app import Admin, Employee, Sales
from datetime import datetime  # Import the datetime module

# Run this script inside a Flask context
with app.app_context():
    # Seed data for Admins
    def seed_admins():
        admin1 = Admin(username='admin1', email='admin1@example.com', password='admin1password')
        admin2 = Admin(username='admin2', email='admin2@example.com', password='admin2password')
        db.session.add(admin1)
        db.session.add(admin2)

    # Seed data for Employees
    def seed_employees():
        # Convert string date to datetime.date object
        date1 = datetime.strptime('2024-01-15', '%Y-%m-%d').date()
        date2 = datetime.strptime('2024-02-20', '%Y-%m-%d').date()

        employee1 = Employee(name='John Doe', role='Manager', shift='Morning', sales=1000.0, salary=3000.0, date_joined=date1)
        employee2 = Employee(name='Jane Doe', role='Attendant', shift='Afternoon', sales=500.0, salary=2000.0, date_joined=date2)
        db.session.add(employee1)
        db.session.add(employee2)

    # Seed data for Sales
    def seed_sales():
        sale1 = Sales(fuel_type='Gasoline', pump_number=1, liters=50, employee_id=1)
        sale2 = Sales(fuel_type='Diesel', pump_number=2, liters=30, employee_id=2)
        db.session.add(sale1)
        db.session.add(sale2)

    # Call the seeding functions
    def seed_data():
        seed_admins()
        seed_employees()
        seed_sales()
        db.session.commit()  # Commit the session to save the data

    # Execute seeding
    seed_data()
    print("Database seeded successfully!")
