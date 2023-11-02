from flask import Blueprint
from app.models import Deck, Card, Comment


get_all_routes = Blueprint('all', __name__)


@get_all_routes.route('')
def get_all():
    """
    Query to get all data.
    """
    decks = Deck.query.all()
    deck_dict_list = [deck.to_dict() for deck in decks]

    cards = Card.query.all()
    card_dict_list = [card.to_dict() for card in cards]

    comments = Comment.query.all()
    comment_dict_list = [comment.to_dict() for comment in comments]

    return {"decks": deck_dict_list, "cards": card_dict_list, "comments": comment_dict_list}
