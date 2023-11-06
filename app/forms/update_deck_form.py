from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Length


class UpdateDeckFormNotLocal(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,100)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100)])
    cover_image_url = FileField("Cover Image Url")
    card_image_url = FileField("Card Image Url")
    card_name = StringField("Card Name")
    type = StringField("Type")
    color_identity = StringField("Color Identity")
    deck_id = IntegerField("Deck ID")


class UpdateDeckFormNoCover(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,100)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100)])
    cover_image_url = FileField("Cover Image Url")
    deck_id = IntegerField("Deck ID")
    card_id = IntegerField("Card ID")
    card_in_deck = StringField("Card In Deck")

class UpdateDeckFormHasCover(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,100)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100)])
    local_cover_image_url = StringField("Cover Image Url")
    deck_id = IntegerField("Deck ID")
    card_id = IntegerField("Card ID")
    card_in_deck = StringField("Card In Deck")
