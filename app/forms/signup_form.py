from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[ InputRequired(message="This field is required"), username_exists])
    email = StringField('email', validators=[ user_exists, Email(), InputRequired(message="This field is required")])
    password = StringField('password', validators=[ InputRequired(message="This field is required")])
    first_name = StringField('first_name', validators=[ InputRequired(message="This field is required")])
    last_name = StringField('last_name', validators=[ InputRequired(message="This field is required")])
    date_of_birth = StringField('date_of_birth', validators=[ InputRequired(message="This field is required")])
