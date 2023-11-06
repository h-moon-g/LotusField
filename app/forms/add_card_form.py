from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Length


class AddCardToDeckForm(FlaskForm):
    card_id = IntegerField("Card ID")
    deck_id = IntegerField("Deck ID")
