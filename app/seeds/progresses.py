from app.models import db, Progress

# Adds a demo user, you can add other users here if you want
def seed_progresses():

    p1 = Progress(entry_id=1, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p2 = Progress(entry_id=2, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p3 = Progress(entry_id=3, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p4 = Progress(entry_id=4,progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p5 = Progress(entry_id=5, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p6 = Progress(entry_id=6, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p7 = Progress(entry_id=7, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p8 = Progress(entry_id=8, progress_date='08-30-2021', progress=True, letter=False, visit=False)
    p9 = Progress(entry_id=9, progress_date='08-30-2021', progress=True, letter=True, visit=True)
    p10 = Progress(entry_id=10, progress_date='08-30-2021', progress=True, letter=False, visit=False)


    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.add(p8)
    db.session.add(p9)
    db.session.add(p10)
    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_progresses():
    db.session.execute('TRUNCATE progresses RESTART IDENTITY CASCADE;')
    db.session.commit()
