from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Journal, Entry
from app.forms import JournalForm, EntryForm

journal_routes = Blueprint('journals', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    error_obj = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            error_obj[field] = error
    return {'errors': [ error_obj ]}, 401

@journal_routes.route('/', methods=["GET"])
def get_journals():
    journals = Journal.query.filter(Journal.user_id == current_user.id).all()
    return {'journals': [journal.to_dict() for journal in journals]}

#single journal
@journal_routes.route('/<int:id>', methods=["GET"])
def get_one_journal(id):
    journal = Journal.query.filter(Journal.id == id).one()
    return journal.to_dict()

@journal_routes.route('/<int:id>/entries', methods=["GET"])
def get_single_journal_with_entries(id):
    journal = Journal.query.get(id)
    entries = Entry.query.filter(Entry.journal_id==id)

    return {
      "journal": journal.to_dict(),
      "entries": [entry.to_dict() for entry in entries]
      }

# {image.to_dict()['id']: image.to_dict() for image in images}

@journal_routes.route('/new-journal', methods=['POST'])
def new_journal():
    form = JournalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        journal = Journal(
            title = form.data['title'],
            coverUrl = form.data['coverUrl'],
            user_id = current_user.id #always put foreign key in form
        )
        db.session.add(journal)
        db.session.commit()
        return journal.to_dict()
    return validation_errors_to_error_messages(form.errors)


@journal_routes.route('/<int:id>/entries/new', methods=['POST'])
def new_entry(id):
    form = EntryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        entry = Entry(
            title = form.data['title'],
            content = form.data['content'],
            strengths = form.data['strengths'],
            user_id = current_user.id,
            journal_id = id
        )
        db.session.add(entry)
        db.session.commit()
        return entry.to_dict()
    return validation_errors_to_error_messages(form.errors)


@journal_routes.route('/edit/<int:id>', methods=['PUT'])
def update_journal(id):
    journal = Journal.query.get(id)
    form = JournalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        journal.title = form.data['title']
        journal.coverUrl = form.data['coverUrl']
        journal.user_id = current_user.id
        db.session.commit()
        return journal.to_dict()
    return validation_errors_to_error_messages(form.errors)



@journal_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_journal(id):
    journal = Journal.query.get(id)
    deleted_journal= journal
    db.session.delete(journal)
    db.session.commit()
    return deleted_journal.to_dict()
