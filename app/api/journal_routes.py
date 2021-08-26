from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import db, Journal, Entry
from app.forms import JournalForm

journal_routes = Blueprint('journals', __name__)

@journal_routes.route('/', methods=["GET"])
def get_journals():
    journals = Journal.query.filter(Journal.user_id == current_user.id).all()
    return {'journals': [journal.to_dict() for journal in journals]}


@journal_routes.route('/<int:id>/entries', methods=["GET"])
def get_single_journal_with_entries(id):
    journal = Journal.query.get(id)
    entries = Entry.query.filter(Entry.journal_id==id).order_by(Entry.updated_at)

    return {
      "journal": journal.to_dict(),
      "entries": [entry.to_dict() for entry in entries]
      }

# {image.to_dict()['id']: image.to_dict() for image in images}

@journal_routes.route('/new-journal', methods=['POST'])
def new_journal():
    form = JournalForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    journal = Journal(
        title = form.data['title'],
        coverUrl = form.data['coverUrl'],
        user_id = form.data['user_id'] #always put foreign key in form
    )
    db.session.add(journal)
    db.session.commit()
    return journal.to_dict()

@journal_routes.route('/edit/<int:id>', methods=['PUT'])
def update_journal(id):
    journal = Journal.query.get(id)
    form = JournalForm()
    journal.title = form.data['title']
    journal.coverUrl = form.data['coverUrl']
    journal.user_id = form.data['user_id']
    db.session.commit()
    return journal.to_dict()



@journal_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_journal(id):
    journal = Journal.query.filter(Journal.user_id == current_user.id, Journal.id ==id)
    delete_journal = Journal.query.get(id)
    if journal:
        db.session.delete(delete_journal)
        db.session.commit()
    return journal.to_dict()
