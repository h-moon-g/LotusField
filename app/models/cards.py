from .db import db, environment, SCHEMA, add_prefix_for_prod
from .associations import deck_cards

class MagicCard(db.Model):
    __tablename__= 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    color_identity = db.Column(db.String(100))
    type = db.Column(db.String(100))
    image_url = db.Column(db.String(255))

    decks_with_card = db.relationship('Deck', secondary=deck_cards, back_populates='cards_in_deck')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "colorIdentity": self.color_identity,
            "type": self.type,
            "imageUrl": self.image_url,
            "decksWithCard": [deck.id for deck in self.decks_with_card]
        }
