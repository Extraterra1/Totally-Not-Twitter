# Totally Not Twitter Backend

## Description:

This is the backend for Totally Not Twitter, a social media platform built as part of The Odin Project curriculum. This backend API is built using Express, with JWT authentication handled by Passport, and Mongoose for database interactions.

## Table of Contents:

- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)

## Usage:

Once the backend is running, you can use the following routes to interact with the API:

### Authentication

- `POST /register` - Register a new user.
- `POST /login` - Log in a user.
- `POST /githubLogin` - Log in a user with GitHub.

### Tweets

- `POST /tweets` - Create a new tweet (protected).
- `GET /tweets/search` - Search tweets.
- `GET /tweets/:id` - Get tweet details.
- `PATCH /tweets/:id/like` - Like a tweet (protected).
- `GET /users/:id/tweets` - Get tweets by a specific user.
- `GET /users/:id/liked` - Get tweets liked by a specific user.
- `GET /users/:id/timeline` - Get timeline tweets for a specific user (protected).
- `GET /explore` - Get explore tab tweets.

### Users

- `PATCH /users/:id/follow` - Follow a user (protected).
- `PATCH /users/:id/unfollow` - Unfollow a user (protected).
- `PATCH /users/:id` - Update user information (protected).
- `GET /users` - Get recommended users.
- `GET /users/:username` - Get user data.

## Dependencies:

Totally Not Twitter Backend uses the following dependencies:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **passport**: Simple, unobtrusive authentication for Node.js.
- **passport-jwt**: Passport authentication strategy using JSON Web Tokens.
- **jsonwebtoken**: JSON Web Token implementation for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.

## Contributing:

Feel free to fork the repository and submit pull requests. Any contributions, whether they’re bug fixes, new features, or performance improvements, are always welcome.

## Disclaimer:

This project is built for educational purposes and is in no way affiliated with or endorsed by Twitter. Any resemblance to actual social media platforms, living or dead, is purely coincidental.
