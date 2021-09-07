from flask_wtf import FlaskForm
from wtforms import StringField, TextField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, InputRequired

class EntryForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=20, message="Title must be more than 0 and less than 20 characters.")])
    content = TextField('Entry', validators=[InputRequired(message="Don't forget to write something!")])
    strengths = StringField("Strengths", validators=[DataRequired(())])
    user_id = IntegerField('user_id', validators=[DataRequired(())])
    journal_id = IntegerField('journal_id', validators=[DataRequired(())])
