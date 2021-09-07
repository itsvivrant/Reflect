from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, InputRequired, Length

class JournalForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=3, max=20, message="Title must be more than 3 and less than 20 characters.")])
    coverUrl = StringField('CoverUrl', validators=[InputRequired(message="Cover Link field is required.")])
    user_id = IntegerField('user_id')
