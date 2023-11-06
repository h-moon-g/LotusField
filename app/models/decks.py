from .db import db, environment, SCHEMA, add_prefix_for_prod
from .associations import deck_cards

class Deck(db.Model):
    __tablename__= 'decks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    description = db.Column (db.Text)
    cover_image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    commander_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')))

    decks_of_user = db.relationship('User',back_populates='users_decks')
    comments_about_deck = db.relationship('Comment', back_populates = 'deck_with_comment')
    cards_in_deck = db.relationship('MagicCard', secondary=deck_cards, back_populates='decks_with_card')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "coverImageUrl": self.cover_image_url,
            "userId": self.user_id,
            "commanderId": self.commander_id,
            "cardsInDeck": [card.id for card in self.cards_in_deck],
            "commentsAboutDeck": [comment.id for comment in self.comments_about_deck]
        }
