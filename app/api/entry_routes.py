from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import db, Entry

entry_routes = Blueprint('entries', __name__)

@entry_routes.route('/all', methods=['GET'])
def all_entries():
    entries = Entry.query.filter(Entry.user_id == current_user.id).all()
    return {'entries': [entry.to_dict() for entry in entries]}

@entry_routes.route('/<int:id>', methods=['GET'])
def get_entry(id):
    entry = Entry.query.get(id)
    return {'entry' : entry.to_dict()}

# @entry_routes.route('/new-entry', methods=['POST'])
