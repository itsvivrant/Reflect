from app.models import db, Happiness


# Adds a demo user, you can add other users here if you want
def seed_happiness():

    h1 = Happiness(user_id=1, overall_happiness=3, happiness_date='09-13-2021')


    db.session.add(h1)
    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_happiness():
    db.session.execute('TRUNCATE entries RESTART IDENTITY CASCADE;')
    db.session.commit()
