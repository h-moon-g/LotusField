from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment_1 = Comment(
        message="Awesome deck! Artifacts and dragons oh my!",
        user_id=1,
        deck_id=2
    )

    comment_2 = Comment(
        message="This has inspired me to make an enchantress deck!",
        user_id=2,
        deck_id=3
    )

    comment_3 = Comment(
        message="Just played agaisnt this commander... who knew mono white could be so explosive!",
        user_id=3,
        deck_id=1
    )


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
