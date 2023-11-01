from app.models import db, Deck, environment, Card, SCHEMA
from sqlalchemy.sql import text


def seed_deck_cards():

    decks = Deck.query.all()
    cards = Card.query.all()
    decks[0].cards_in_deck.extend([cards[0], cards[1], cards[2]])
    decks[1].cards_in_deck.extend([cards[3], cards[4], cards[5]])
    decks[2].cards_in_deck.extend([cards[6], cards[7], cards[8]])
    db.session.commit()

def undo_deck_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.deck_cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM deck_cards"))

    db.session.commit()
