from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Deck, MagicCard
from app.forms.new_deck_form import CreateDeckForm
from app.forms.update_deck_form import UpdateDeckFormNotLocal
from app.forms.update_deck_form import UpdateDeckFormNoCover
from app.forms.update_deck_form import UpdateDeckFormHasCover
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


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
        if form.data['local_card'] == "nope":
            deck_image = form.data['cover_image_url']
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
                name = form.data['card_name'],
                color_identity = form.data['color_identity'],
                type = form.data['type'],
                image_url = card_url
            )
            db.session.add(new_card)
            db.session.commit()

            new_deck = Deck (
                user_id = current_user.id,
                commander_id = new_card.id,
                name = form.data['name'],
                description = form.data['description'],
                cover_image_url = deck_url
            )
            db.session.add(new_deck)
            db.session.commit()

            new_deck.cards_in_deck.append(new_card)
            new_card.decks_with_card.append(new_deck)
            current_user.users_decks.append(new_deck)
            db.session.commit()

            return {"deck": new_deck.to_dict(), "card": new_card.to_dict(), "user": current_user.to_dict(), "local": form.data['local_card']}
        elif form.data['local_card'] == "yup":
            deck_commander = MagicCard.query.get(form.data['local_card_id'])

            new_deck = Deck (
                user_id = current_user.id,
                commander_id = deck_commander.id,
                name = form.data['name'],
                description = form.data['description'],
                cover_image_url = form.data['local_cover_image_url']
            )
            db.session.add(new_deck)
            db.session.commit()

            new_deck.cards_in_deck.append(deck_commander)
            deck_commander.decks_with_card.append(new_deck)
            current_user.users_decks.append(new_deck)
            db.session.commit()

            return {"deck": new_deck.to_dict(), "card": deck_commander.to_dict(), "user": current_user.to_dict(), "local": form.data['local_card']}
        elif form.data['local_card'] == "yup but no cover":
            deck_image = form.data['cover_image_url']
            deck_image.filename = get_unique_filename(deck_image.filename)

            deck_upload = upload_file_to_s3(deck_image)
            if "url" not in deck_upload:
                return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
            deck_url = deck_upload['url']

            deck_commander = MagicCard.query.get(form.data['local_card_id'])

            new_deck = Deck (
                user_id = current_user.id,
                commander_id = deck_commander.id,
                name = form.data['name'],
                description = form.data['description'],
                cover_image_url = deck_url
            )
            db.session.add(new_deck)
            db.session.commit()

            new_deck.cards_in_deck.append(deck_commander)
            deck_commander.decks_with_card.append(new_deck)
            current_user.users_decks.append(new_deck)
            db.session.commit()

            return {"deck": new_deck.to_dict(), "card": deck_commander.to_dict(), "user": current_user.to_dict(), "local": form.data['local_card']}
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@deck_routes.route('/update', methods=['PUT'])
@login_required
def update_deck_not_local():
    """
    Creates new deck. Returns deck dictionary.
    """
    form = UpdateDeckFormNotLocal()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            deck_image = form.data['cover_image_url']
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
                name = form.data['card_name'],
                color_identity = form.data['color_identity'],
                type = form.data['type'],
                image_url = card_url
            )
            db.session.add(new_card)
            db.session.commit()

            deck_to_update = Deck.query.get(form.data['deck_id'])

            deck_to_update.commander_id = new_card.id,
            deck_to_update.name = form.data['name'],
            deck_to_update.description = form.data['description'],
            deck_to_update.cover_image_url = deck_url

            db.session.commit()

            deck_to_update.cards_in_deck.append(new_card)
            new_card.decks_with_card.append(deck_to_update)
            db.session.commit()

            return {"deck": deck_to_update.to_dict(), "card": new_card.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
