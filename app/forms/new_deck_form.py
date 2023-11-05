from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Length
# from models.cards import MagicCard
# import requests

# def commander_valid(form, field):
#     # Checking if commander exists and is valid
#     commander_name = field.data
#     local_commander = MagicCard.query.filter(MagicCard.name == commander_name).first()
#     if not local_commander:
#         api_card = requests.get(f'https://api.scryfall.com/cards/named?exact={commander_name}')
#         api_card = api_card.json()
#         if "type_line" in api_card:
#             if api_card['type_line'][0:18] != "Legendary Creature":
#                 raise ValidationError('Commanders must be legendary creatures!')
#         else:
#             raise ValidationError("Invalid card name!")
#     if local_commander:
#         if local_commander.type.slice(0, 19) != "Legendary Creature":
#             raise ValidationError('Commanders must be legendary creatures!')

class CreateDeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,100)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100)])
    cover_image_url = FileField("Cover Image Url")
    card_image_url = FileField("Card Image Url")
    card_name = StringField("Card Name")
    type = StringField("Type")
    color_identity = StringField("Color Identity")
    local_card = StringField("Local Card")
    local_card_id = IntegerField("Local Card ID")
    local_cover_image_url = StringField("Local Cover Image Url")
