## Welcome to Lotusfield!

Lotusfield's website: https://lotusfield.onrender.com

# Description

Lotusfield is a Moxfield inspired full-stack web application designed to create commander decks for Magic the Gathering.
In Lotusfield after signing in you can create decks, add cards to your deck, and view and comment on others decks!

# Exclusive Features

- User Authentication Feature:
  By hashing and storing user's password, Lotusfield's login system provides secure authentication.
- Personal account:
  User can sign up and log in to own account.
  Provided Demo User enables experiencing the functionality of the site.
  Logged in User has a pleasure of using all build in features.
  Logged out User can view all decks and comments.

# Decks

- User can create/add a new deck.
- User can read/view all decks.
- User can update/edit a chosen deck.
- User can delete/remove a chosen deck.

# Cards

- User can create/add a new card.
- User can read/view all cards.
- User can delete/remove a chosen card.

# Comments

- User can create/add a new comment.
- User can read/view all comments.
- User can update/edit a chosen comment.
- User can delete/remove a chosen comment.

# Technologies Used In Lotusfield Creation

- Backend:

  - Python
  - Flask

- Frontend:

  - React
  - Redux
  - Javascript
  - HTML
  - CSS

- AWS
  - All images hosted on AWS.

## Installation Instructions

1. Install dependencies

```bash
pipenv install -r requirements.txt
```

2. Create a **.env** file based on the example with proper settings for your development environment

3. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

```bash
flask run
```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
