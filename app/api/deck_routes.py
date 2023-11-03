from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Deck, MagicCard
from app.forms import CreateDeckForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
import requests
from icecream import ic

deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/new', methods=['POST'])
@login_required
def create_new_deck():
    """
    Creates new deck. Returns deck dictionary.
    """
    form = CreateDeckForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        api_card = requests.get(f'https://api.scryfall.com/cards/named?exact={form.data["commander"]}')
        api_card = api_card.json()

        deck_image = form.data['card_image_url']
        deck_image.filename = get_unique_filename(deck_image.filename)

        deck_upload = upload_file_to_s3(deck_image)
        if "url" not in deck_upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        deck_url = deck_upload['url']

        card_image = form.data['card_image_url']
        card_image.filename = get_unique_filename(card_image.filename)

        card_upload = upload_file_to_s3(card_image)
        if "url" not in card_upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        card_url = card_upload['url']

        new_card = MagicCard (
            name = api_card['name'],
            color_identity = "".join(api_card['color_identity']),
            type = api_card['type_line'],
            image_url = card_url
        )
        db.session.add(new_card)
        db.session.commit()

        new_deck = Deck (
            user_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            cover_image_url = deck_url
        )
        db.session.add(new_deck)
        db.session.commit()

        return new_deck.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
