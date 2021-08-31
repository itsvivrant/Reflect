from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import db, Entry
from app.forms import EntryForm

entry_routes = Blueprint('entries', __name__)

@entry_routes.route('/all', methods=['GET'])
def all_entries():
    entries = Entry.query.filter(Entry.user_id == current_user.id).all()
    return {'entries': [entry.to_dict() for entry in entries]}

@entry_routes.route('/<int:id>', methods=['GET'])
def get_entry(id):
    entry = Entry.query.get(id)
    return {'entry' : entry.to_dict()}


@entry_routes.route('/edit/<int:id>', methods=['PUT'])
def update_entry(id):
    entry = Entry.query.get(id)
    form = EntryForm()
    entry.title = form.data['title']
    entry.content = form.data['content']
    entry.strengths = form.data['strengths']
    entry.user_id = form.data['user_id']
    db.session.commit()
    return entry.to_dict()

@entry_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_entry(id):
    entry = Entry.query.get(id)
    deleted_entry = entry
    db.session.delete(entry)
    db.session.commit()
    return deleted_entry.to_dict()
