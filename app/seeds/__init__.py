from flask.cli import AppGroup
from .users import seed_users, undo_users
from .deck_seeds import seed_decks, undo_decks
from .card_seeds import seed_cards, undo_cards
from .comment_seeds import seed_comments, undo_comments
from .deck_cards_seeds import seed_deck_cards, undo_deck_cards

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_deck_cards()
        undo_comments()
        undo_cards()
        undo_decks()
        undo_users()
    seed_users()
    seed_decks()
    seed_cards()
    seed_comments()
    seed_deck_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_deck_cards()
    undo_comments()
    undo_cards()
    undo_decks()
    undo_users()
    # Add other undo functions here
