from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='Demo',
        last_name='User',
        date_of_birth='05-01-1995')
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        first_name='Marnie',
        last_name='Larnie',
        date_of_birth='12-14-1980')
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        first_name='Bobby',
        last_name='Franl',
        date_of_birth='11-11-1972')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
