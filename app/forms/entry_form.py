from flask_wtf import FlaskForm
from wtforms import StringField, TextField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class EntryForm(FlaskForm):
    title = StringField('Title')
    content = TextField('Entry', [DataRequired()])
    strengths = StringField("Strengths")
    user_id = IntegerField('user_id')
    journal_id = IntegerField('journal_id')
