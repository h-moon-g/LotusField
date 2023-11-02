from app.models import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text


def seed_decks():
    deck_1 = Deck(
        user_id=1,
        commander_id=1,
        name="Giada, Angel Tribal",
        description="I <3 mono white",
        cover_image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/giada-font-of-hope-art.jpg"
    )

    deck_2 = Deck(
        user_id=2,
        commander_id=4,
        name="Live and Prosper",
        description="So much treasure...",
        cover_image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/prosper-tome-bound-art.jpg"
    )

    deck_3 = Deck(
        user_id=3,
        commander_id=7,
        name="Sythis, Enchantment Tribal",
        description="Oops, all enchantments!",
        cover_image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/sythis-harvest-s-hand-art.jpg"
    )


    db.session.add(deck_1)
    db.session.add(deck_2)
    db.session.add(deck_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))

    db.session.commit()
