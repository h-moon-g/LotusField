from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import MagicCard
from icecream import ic
import requests

def commander_valid(form, field):
    # Checking if commander exists and is valid
    commander_name = field.data
    local_commander = MagicCard.query.filter(MagicCard.name == commander_name).first()
    if not local_commander:
        api_card = requests.get(f'https://api.scryfall.com/cards/named?exact={commander_name}')
        api_card = api_card.json()
        if api_card:
            if api_card['type_line'][0:18] != "Legendary Creature":
                raise ValidationError('Not a valid commander!')
    if local_commander:
        if local_commander.type.slice(0, 19) != "Legendary Creature":
            raise ValidationError('Not a valid commander!')

class CreateDeckForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,100)])
    description = StringField("Description", validators=[DataRequired(), Length(1,100)])
    commander = StringField("Commander", validators=[DataRequired(), Length(1,100), commander_valid])
