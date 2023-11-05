from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Length


class CreateCardForm(FlaskForm):
    card_image_url = FileField("Card Image Url")
    card_name = StringField("Card Name")
    type = StringField("Type")
    color_identity = StringField("Color Identity")
    deck_id = IntegerField("Local Card ID")
