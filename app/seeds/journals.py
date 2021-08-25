from app.models import db, Journal

# Adds a demo user, you can add other users here if you want
def seed_journals():

    j7 = Journal(user_id=1, title='Rewirements Workbook', coverUrl='https://images.unsplash.com/photo-1592295880235-e276a337ddf1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80')
    j1 = Journal(user_id=1, title='Coding', coverUrl='https://images.unsplash.com/photo-1618331835717-801e976710b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')
    j2 = Journal(user_id=1, title='Dreams', coverUrl='https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')
    j3 = Journal(user_id=1, title='Relationship', coverUrl='https://images.unsplash.com/photo-1567718994905-e564390feac7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')
    j4 = Journal(user_id=1, title='Exercise', coverUrl='https://images.unsplash.com/photo-1543539748-a4bf17a68a8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80')
    j5 = Journal(user_id=1, title='Food', coverUrl='https://images.unsplash.com/photo-1620812097331-ff636155488f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80')
    j6 = Journal(user_id=1, title='Travel', coverUrl='https://images.unsplash.com/photo-1596483266428-d4a5f6b27f2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')
    j8 = Journal(user_id=1, title='Just Thoughts', coverUrl='https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')


    db.session.add(j1)
    db.session.add(j2)
    db.session.add(j3)
    db.session.add(j4)
    db.session.add(j5)
    db.session.add(j6)
    db.session.add(j7)
    db.session.add(j8)
    db.session.commit()

# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and resets
# # the auto incrementing primary key
def undo_journals():
    db.session.execute('TRUNCATE journals RESTART IDENTITY CASCADE;')
    db.session.commit()
