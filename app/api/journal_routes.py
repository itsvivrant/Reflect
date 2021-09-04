from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import db, Journal, Entry
from app.forms import JournalForm, EntryForm

journal_routes = Blueprint('journals', __name__)

@journal_routes.route('/', methods=["GET"])
def get_journals():
    journals = Journal.query.filter(Journal.user_id == current_user.id).order_by(Journal.created_at.desc()).all()
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
        user_id = current_user.id #always put foreign key in form
    )
    db.session.add(journal)
    db.session.commit()
    return journal.to_dict()


@journal_routes.route('/<int:id>/entries/new', methods=['POST'])
def new_entry(id):
    form = EntryForm()
    entry = Entry(
        title = form.data['title'],
        content = form.data['content'],
        strengths = form.data['strengths'],
        user_id = current_user.id,
        journal_id = id
    )
    print(entry)
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()


@journal_routes.route('/edit/<int:id>', methods=['PUT'])
def update_journal(id):
    journal = Journal.query.get(id)
    form = JournalForm()
    journal.title = form.data['title']
    journal.coverUrl = form.data['coverUrl']
    journal.user_id = current_user.id
    db.session.commit()
    return journal.to_dict()



@journal_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_journal(id):
    journal = Journal.query.get(id)
    deleted_journal= journal
    db.session.delete(journal)
    db.session.commit()
    return deleted_journal.to_dict()
    ### Another way, wondering why it doesn't work
    # journal = Journal.query.filter(Journal.user_id == current_user.id, Journal.id ==id)
    # delete_journal = Journal.query.get(id)
    # if journal:
    #     db.session.delete(delete_journal)
    #     db.session.commit()
    #     return journal.to_dict()
