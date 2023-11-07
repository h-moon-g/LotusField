from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateCommentForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired(), Length(1,300)])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    deck_id = IntegerField("Deck ID",  validators=[DataRequired()])
