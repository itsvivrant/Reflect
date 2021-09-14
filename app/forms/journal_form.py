from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, InputRequired, Length

class JournalForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=30, message="Title must be more than 1 and less than 30 characters.")])
    coverUrl = StringField('CoverUrl', validators=[InputRequired(message="Cover Link field is required.")])
    user_id = IntegerField('user_id')
