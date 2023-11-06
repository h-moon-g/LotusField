from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Length


class CreateDeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,300)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100)])
    cover_image_url = FileField("Cover Image Url")
    card_image_url = FileField("Card Image Url")
    card_name = StringField("Card Name")
    type = StringField("Type")
    color_identity = StringField("Color Identity")
    local_card = StringField("Local Card")
    local_card_id = IntegerField("Local Card ID")
    local_cover_image_url = StringField("Local Cover Image Url")
