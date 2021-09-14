from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, InputRequired, NumberRange

class HappinessForm(FlaskForm):
    overall_happiness = IntegerField("overall_happiness", validators=[NumberRange(min=0, max=5, message="Happiness range must be 0 to 5. ")])
    happiness_date = StringField("happiness_date", validators=[InputRequired(message="Must put in a date.")])
    user_id = IntegerField("user_id")
