from flask_wtf import FlaskForm
from wtforms import StringField, TextField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class EntryForm(FlaskForm):
    title = StringField('Title')
    content = TextField('Entry')
    strengths = StringField("Strengths")
    progress = BooleanField()
    letter = BooleanField()
    visit = BooleanField()
