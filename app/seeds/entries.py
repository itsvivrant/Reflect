from app.models import db, Entry
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_entries():

    e1 = Entry(user_id=1, journal_id=1, title='Strengths', content=fake.text(), strengths='I\'m resilient in face of adversity')
    e2 = Entry(user_id=1, journal_id=2, title='Savoring', content=fake.text(), strengths='')
    e3 = Entry(user_id=1, journal_id=3, title='Daily Graitude', content=fake.text(),  strengths='')
    e4 = Entry(user_id=1, journal_id=4, title='Random Acts Of Kindness', content=fake.text(), strengths='')
    e5 = Entry(user_id=1, journal_id=5, title='Social Connection', content=fake.text(), strengths='')
    e6 = Entry(user_id=1, journal_id=6, title='Exercise', content=fake.text(), strengths='')
    e7 = Entry(user_id=1, journal_id=7, title='Sleep', content=fake.text(), strengths='')
    e8 = Entry(user_id=1, journal_id=8, title='Meditate', content=fake.text(), strengths='')
    e9 = Entry(user_id=1, journal_id=9, title='Gratitude Letter/Visit', content=fake.text(), strengths='')
    e10 = Entry(user_id=1, journal_id=10, title='Graduated App Academy!', content=fake.text(), strengths='')


    db.session.add(e1)
    db.session.add(e2)
    db.session.add(e3)
    db.session.add(e4)
    db.session.add(e5)
    db.session.add(e6)
    db.session.add(e7)
    db.session.add(e8)
    db.session.add(e9)
    db.session.add(e10)

    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_entries():
    db.session.execute('TRUNCATE entries RESTART IDENTITY CASCADE;')
    db.session.commit()
