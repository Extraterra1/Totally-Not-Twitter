# Totally Not Twitter Frontend

## Description:

This is the frontend for Totally Not Twitter, a social media platform built as part of The Odin Project curriculum. The frontend is built using React and React Router, with react-auth-kit for authentication management, Formik for form management, react-hot-toast for notifications, and styled-components for CSS.

## Table of Contents:

- [Usage](#usage)
- [Routes](#routes)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)

## Usage:

Once the frontend is running locally, you can access it through your web browser. Here are some key features:

- **Landing Page**: Contains login buttons and logic. Login with GitHub functionality.
- **Timeline**: Secured route displaying tweets from users you follow.
- **Explore**: Secured route showcasing featured tweets from all users.
- **Search**: Public route with the ability to search tweets or users.
- **User Profile**: Public route displaying user profile, follower/following count, and the ability to follow/unfollow users. Users can change their name, picture, and password from their profile. Displays user's tweets and liked tweets.
- **Tweet Details**: Public route showing tweet details, likes, retweets, and replies.

## Routes:

- **Home**

  - `/`  
    Landing page with login options.

- **Timeline**

  - `/timeline`  
    User's timeline showing tweets from people they follow (secured).

- **Explore**

  - `/explore`  
    Explore tweets from all users (secured).

- **Search**

  - `/search`  
    Search for tweets or users (public).

- **User Profile**

  - `/:username`  
    User profile page with tweets, followers, and follow options (public).

- **Tweet Details**

  - `/:username/status/:tweetID`  
    Detailed view of a specific tweet (public).

## Dependencies:

Totally Not Twitter Frontend uses the following dependencies:

- **@auth-kit/react-router**: Authentication kit for React Router.
- **@iconify/react**: Icon library for React.
- **axios-hooks**: Hooks for making API requests with Axios.
- **formik**: Library for building forms in React.
- **moment**: Library for parsing, validating, manipulating, and formatting dates.
- **react**: JavaScript library for building user interfaces.
- **react-auth-kit**: Authentication library for React.
- **react-cookie**: Hooks for handling cookies in React.
- **react-dom**: React package for working with the DOM.
- **react-hot-toast**: Library for showing toast notifications in React.
- **react-medium-image-zoom**: Image zoom component for React.
- **react-modal**: Library for creating accessible modal dialogs in React.
- **react-router-dom**: Routing library for React.
- **react-spinners**: Collection of loading spinner components for React.
- **react-tooltip**: Library for creating tooltips in React.
- **styled-components**: Library for styling React components using tagged template literals.
- **yup**: JavaScript schema builder for value parsing and validation.

## Contributing:

Feel free to fork the repository and submit pull requests. Any contributions, whether they’re bug fixes, new features, or performance improvements, are always welcome.

## Disclaimer:

This project is built for educational purposes and is in no way affiliated with or endorsed by Twitter. Any resemblance to actual social media platforms, living or dead, is purely coincidental.
