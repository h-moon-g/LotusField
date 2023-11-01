from .db import db, environment, SCHEMA, add_prefix_for_prod
from .associations import deck_cards

class Deck(db.Model):
    __tablename__= 'decks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    description = db.Column (db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    decks_of_user = db.relationship('User',back_populates='users_decks')
    comments_about_deck = db.relationship('Comment', back_populates = 'deck_with_comment')
    cards_in_deck = db.relationship('Card', secondary=deck_cards, back_populates='decks_with_card')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "userId": self.user_id,
            "cardsInDeck": [card.id for card in self.cards_in_deck],
            "commentsAboutDeck": [comment.id for comment in self.comments_about_deck]
        }
