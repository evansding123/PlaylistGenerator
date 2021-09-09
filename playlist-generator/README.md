# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up

Before you can run this app, you will need to create a Spotify account if you don't have one already and then create an App from here
[Spotify Apps](https://developer.spotify.com/dashboard/applications). Once you created an app, go to the App Settings and copy the app's
`Client ID` and then open the `SpotifyApi.js` in this project and replace the `CHANGE THIS TO YOUR CLIENT ID` with your app's Client ID.

You will also need to open the App Settings and add `http://localhost:3000/callback` as one of the `Redirect URIs` so that after the user
logged in to from your app, they will be redirected to this page.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
