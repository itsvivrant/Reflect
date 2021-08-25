from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Journal

journal_routes = Blueprint('journals', __name__)

@journal_routes.route('/')
@login_required
def get_journals():
    journals = Journal.query.all()
    return {'journals': [journal.to_dict() for journal in journals]}

@journal_routes.route('/<int:id>')
@login_required
def get_single_journal():
    journal = Journey.query.get(id)
    return user.to_dict()
