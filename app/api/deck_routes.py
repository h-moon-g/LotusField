from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Deck, MagicCard
from app.forms import CreateDeckForm
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
        # image= form.data['cover_image_url']
        # image.filename = get_unique_filename(image.filename)
        # url='https://i.imgur.com/8LMyVdU.jpg'


        # upload = upload_file_to_s3(image)
        # if "url" not in upload:
        #     return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        # url = upload['url']


        # new_album = Album (
        #     title = form.data['title'],
        #     release_date = form.data['release_date'],
        #     artist = form.data['artist'],
        #     cover_image_url = url,
        #     user_owner= current_user.id
        # )
        # db.session.add(new_album)
        # db.session.commit()

        return "hi"
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
