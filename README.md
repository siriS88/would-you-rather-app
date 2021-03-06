# Intro
This project is developed as part of the Udacity React Nanodegree and uses code provided as part of this program.


# App Overview

Would you rather is a React app that uses a Redux store to save data on the client side. Container React components connect 
to the redux store to fetch the required slices of the store and provide necessary props to the Presentational React Components via 
`mapStateToProps` and `mapDispatchToProps`.  
The allows users to login/register and vote on polls with two given options. Users can add new polls that everyone can then vote on and 
also look at poll details and percentages. They can view their rank among other users on the Leaderboard and like/dislike polls.

The app's backend includes mock users and questions data from udacity (https://github.com/udacity/reactnd-project-would-you-rather-starter). The app is styled using the Material-UI Library (https://material-ui.com/).

# Features Available

* Login as existing user
* Register as a new user
* Home page on login that displays Unanswered and Answered polls in chronological order from left to right
* Clicking on an unanswered poll shows details of user who posted it as well as option to vote or like the poll
* Clicking on an answered poll shows details of which options the user voted for, total votes for an option and 
percentage of users who voted for an option. It also provides an option to like or dislike a poll once liked.
* Adding a new poll with ability to upload an avatar
* Leaderboard that ranks the user based on their total asked and answered questions
* Navigation bar on the left to move between home, leaderboard and create poll pages
* View a users profile that displays their favorite polls as well as polls they asked and answered
* Toggle likes on a poll
* Logout

Notes:
* There is no way for users to change their vote after voting
* There is no backend server, so refreshing the page will reset changes

# Run the App

To view the Would You Rather App:
* clone the `react-redux-would-you-rather repo`
* cd to `would-you-rather`
* install all project dependencies with `yarn`
* start the development server with `yarn run start`

The page will be served on `localost:3000`
