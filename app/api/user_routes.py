from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Happiness
from app.forms import HappinessForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    error_obj = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            error_obj[field] = error
    return {'errors': [ error_obj ]}, 401


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('<int:id>/happiness', methods=["GET"])
def happiness(id):
    user = User.query.get(id)
    happiness = Happiness.query.filter(Happiness.user_id == id).first()
    return happiness.to_dict()


@user_routes.route('/create-happiness', methods=["POST"])
def new_happiness():
    form = HappinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        happiness= Happiness(
            overall_happiness = form.data['overall_happiness'],
            happiness_date = form.data["happiness_date"],
            user_id = current_user.id
        )
        db.session.add(happiness)
        db.session.commit()
        return happiness.to_dict()
    return validation_errors_to_error_messages(form.errors)

@user_routes.route('/edit/happiness/<int:id>', methods=["PUT"])
def update_happiness(id):
    happiness = Happiness.query.get(id)
    form = HappinessForm
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        happiness.overall_happiness = form.data['overall_happiness'],
        happiness.happiness_date = form.data["happiness_date"],
        happiness.user_id = current_user.id
        db.session.commit()
        return happiness.to_dict()
    return validation_errors_to_error_messages(form.errors)

@user_routes.route('/delete/happiness/<int:id>', methods=["DELETE"])
def delete_happiness(id):
    happiness = Happiness.query.get(id)
    deleted_happiness = happiness
    db.session.delete(happiness)
    db.session.commit()
    return deleted_happiness.to_dict()
