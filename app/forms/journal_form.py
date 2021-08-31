from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class JournalForm(FlaskForm):
    title = StringField('Title' )
    coverUrl = StringField('CoverUrl', [DataRequired()])
    user_id = IntegerField('user_id')
