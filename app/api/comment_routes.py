from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Deck, Comment
from app.forms.new_comment_form import CreateCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/add', methods=['POST'])
@login_required
def create_new_comment():
    """
    Creates new comment for a deck.
    """
    form = CreateCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_comment = Comment (
            message = form.data['message'],
            user_id = form.data['user_id'],
            deck_id = form.data['deck_id']
        )
        db.session.add(new_comment)
        db.session.commit()

        deck_for_comment = Deck.query.get(form.data['deck_id'])

        deck_for_comment.comments_about_deck.append(new_comment)
        db.session.commit()

        return {"deck": deck_for_comment.to_dict(), "comment": new_comment.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
