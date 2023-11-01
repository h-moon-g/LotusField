from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__= 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    message = db.Column (db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')))

    deck_with_comment = db.relationship('Deck', back_populates = 'comments_about_deck')

    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "userId": self.user_id,
            "deckId": self.deck_id
        }
