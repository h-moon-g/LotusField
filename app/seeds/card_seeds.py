from app.models import db, MagicCard, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    card_1 = MagicCard(
        name="Giada, Font of Hope",
        color_identity="W",
        type="Legendary Creature — Angel",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/giada-font-of-hope.jpg",
    )

    card_2 = MagicCard(
        name="Plains",
        color_identity="W",
        type="Basic Land — Plains",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/plains.jpg"
    )

    card_3 = MagicCard(
        name="Archangel of Thune",
        color_identity="W",
        type="Creature — Angel",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/archangel-of-thune.jpg"
    )

    card_4 = MagicCard(
        name="Prosper, Tome-Bound",
        color_identity="BR",
        type="Legendary Creature — Tiefling Warlock",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/prosper-tome-bound.jpg",
    )

    card_5 = MagicCard(
        name="Swamp",
        color_identity="B",
        type="Basic Land — Swamp",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/swamp.jpg"
    )

    card_6 = MagicCard(
        name="Jeska's Will",
        color_identity="R",
        type="Sorcery",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/jeskas-will.jpg"
    )

    card_7 = MagicCard(
        name="Sythis, Harvest's Hand",
        color_identity="GW",
        type="Legendary Enchantment Creature — Nymph",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/sythis-harvest-s-hand.jpg",
    )

    card_8 = MagicCard(
        name="Forest",
        color_identity="G",
        type="Basic Land — Forest",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/forest.jpg"
    )

    card_9 = MagicCard(
        name="Dueling Grounds",
        color_identity="GW",
        type="Enchantment",
        image_url="https://lotusfieldbucket.s3.us-west-2.amazonaws.com/dueling-grounds.jpg"
    )

    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.add(card_4)
    db.session.add(card_5)
    db.session.add(card_6)
    db.session.add(card_7)
    db.session.add(card_8)
    db.session.add(card_9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
