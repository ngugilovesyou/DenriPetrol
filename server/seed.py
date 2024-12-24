from app import app, db
from models import User, Employee, Sales, Order, Supplier, Fuel
from datetime import datetime
from werkzeug.security import generate_password_hash

# Run this script inside a Flask context
with app.app_context():
    # Seed data for Users
    User.query.delete()
    db.session.commit()
    Employee.query.delete()
    db.session.commit()
    Fuel.query.delete()
    db.session.commit()
    Supplier.query.delete()
    db.session.commit()
    Sales.query.delete()
    db.session.commit()
    def seed_users():
        # Create User objects
        user1 = User(
            first_name='James', 
            last_name='Bond', 
            email='User1@example.com',
            password=generate_password_hash('User1password'),
            is_admin=True, 
            date_joined=datetime.strptime('2024-01-15', '%Y-%m-%d').date()
        )
        user2 = User(
            first_name='Joshua', 
            last_name='Bed', 
            email='User2@example.com', 
            password=generate_password_hash('User2password'),
            is_admin=False, 
            date_joined=datetime.strptime('2024-01-15', '%Y-%m-%d').date()
        )
        # Add all users to the database session
        db.session.add_all([user1, user2])
        db.session.commit()
        print("Seeded users successfully.")

    def seed_employees():
        # Create Employee objects
        employee1 = Employee(
            first_name='Samuel', 
            last_name='Gitau', 
            email='samuel.gitau@example.com', 
            role='Marketing Manager', 
            phone_number='+254758750963', 
            shift='Morning', 
            sales=0, 
            salary=100000, 
            is_paid=False, 
            date_joined=datetime.strptime('2024-01-01', '%Y-%m-%d').date()
        )
        # Add all employees to the session
        db.session.add_all([employee1])
        db.session.commit()
        print("Employees seeded successfully.")

    def seed_sales():
        # Create Sales records
        sale1 = Sales(
            fuel_type='Diesel', 
            pump='Pump 1', 
            date=datetime.strptime('2024-12-23', '%Y-%m-%d').date(), 
            time=datetime.strptime('14:39', '%H:%M').time(),
            litres=1000.0, 
            total_cost=15000.0,
            employee_id=1  
        )
        # Add all sales to the session
        db.session.add_all([sale1])
        db.session.commit()
        print("Sales seeded successfully.")
    
    def seed_suppliers():
        suppliers = [
            Supplier(
                name='ABC Fuels',
                email='contact@abcfuels.com',
                phone_number='254712345678'
            ),
            Supplier(
                name='Kenya Energy Solutions',
                email='info@kenyaenergysolutions.co.ke',
                phone_number='254711223344'
            ),
            Supplier(
                name='East Africa Petroleum Ltd.',
                email='sales@eastafricapetroleum.com',
                phone_number='254733445566'
            ),
            Supplier(
                name='Nairobi Fuel Distributors',
                email='support@nairoifueldist.co.ke',
                phone_number='254722556677'
            ),
            Supplier(
                name='Rift Valley Oil Supplies',
                email='inquiries@riftvalleyoils.com',
                phone_number='254720123456'
            ),
            Supplier(
                name='Coastal Petroleum Co.',
                email='service@coastalpetroleum.co.ke',
                phone_number='254734567890'
            ),
            Supplier(
                name='Lake Region Energy',
                email='contact@lakeregionenergy.com',
                phone_number='254710987654'
            ),
            Supplier(
                name='Mount Kenya Fuels',
                email='info@mountkenyafuels.com',
                phone_number='254715555444'
            ),
            Supplier(
                name='Northern Oil Distributors',
                email='sales@northernoildist.co.ke',
                phone_number='254713332211'
            ),
            Supplier(
                name='Savannah Fuel Suppliers',
                email='help@savannahfuels.com',
                phone_number='254727888999'
            )
        ]

    
        db.session.add_all(suppliers)
        db.session.commit()
        print("Suppliers seeded successfully.")

    def seed_orders():
        # Create Order objects
        order1 = Order(
            fuel_type='Diesel',
            supplier='ABC Fuels',
            status='Pending',
            estimated_delivery_date=datetime.strptime('2024-12-28', '%Y-%m-%d').date()
        )
        db.session.add(order1)
        db.session.commit()
        print("Orders seeded successfully.")

    def seed_fuel():
        fuel1 = Fuel(fuel_type="Petrol", level=0, price=0)
        fuel2 = Fuel(fuel_type="Diesel", level=0, price=0)
        fuel3 = Fuel(fuel_type="Kerosene", level=0, price=0)
        db.session.add_all([fuel1, fuel2, fuel3])
        db.session.commit()
        print("Fuel seeded successfully.")

    def seed_data():
        try:
            seed_users()
            seed_employees()
            seed_sales()
            seed_suppliers()
            seed_orders()
            seed_fuel()
            print("Database seeded successfully!")
        except Exception as e:
            db.session.rollback()
            print(f"Seeding failed: {e}")

    if __name__ == '__main__':
        seed_data()
