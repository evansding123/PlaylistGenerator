# Frontend Project - Spotify Playlist Generator

To kick off the interview process, we'd like to see how you apply your frontend coding skills to building a small
React application.

We would like you to implement a React application that allows a user to easily generate Spotify playlists, using
the [Spotify API](https://developer.spotify.com/documentation/web-api/). But instead of asking the user to add each
individual tracks to the playlist, the app will automatically populate the playlist with tracks based on some
criteria selected by the user.

## Specifications

There are multiple ways to search for tracks from the Spotify API. But the endpoint related to [getting recommendations](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-recommendations)
is likely to be the most useful to you. The endpoint allows you to fetch tracks in a musical genre or stylistically
similar to a certain artist.

The application should allow Spotify users to complete the following workflow:

1. Select a musical genre from a list, or enter an artist name, as the "seed".
2. Adjust the desired value of various "audio features" that can further refine the track selection. (The Spotify API endpoint
   for recommendations support a number of such criteria, including "energy", "danceability", "acousticness", etc. You may
   decide which of these criteria can be useful/meaningful to the typical users and decide how to present the controls in the UI.)
3. Select the total playing time of the playlist. The options are 30, 45, 60, and 90 minutes.
4. Click a button that says "Generate" to generate the playlist.
5. The tracks will be shown to the users. You may decide how you want to present these tracks, but you should
   at least display the track name, the artist name, the album name, the release date, and the thumbnail image.
6. If the user click the "Generate" button again, a new playlist should be generated. (You should make an effort to
   make sure the tracks returned are different each time, even if the "seed" and "audio features" are the same.)
7. If the user is satisfied with the playlist, they can enter a name for the playlist and save it to their Spotify account.

In addition, because this app depends on the Spotify API, it must handle Spotify user authentication via OAuth.

## Key Considerations

Treat this project as building a prototype. You are free to make your design choices on layout and visual
presentation for the UI. Focus on functionality and ease of use. If you see ambiguity in the spec, make your best
judgement and annotate/comment in the code about these decisions.

When we review your work, we will focus on the following areas:
- General code quality
    - Functional correctness
    - Computational and memory efficiency
    - Sufficient error and edge case handling
    - Easy for others to understand and maintain
- Web-related
    - Precision and attention to details (e.g. element sizing, alignment, spacing, etc.)
    - Responsiveness (app should work in screens of all sizes)
    - Cross-browser compatibility (app should work on Chrome, Firefox and Safari)
- React-related
    - Organization of components
    - State management (try not to use Redux)


## Logistics

### Getting Started
To help you boostrap this project, we have included in this repo a React framework under the directory `playlist-generator`.
We have also implemented parts of the app needed to handle Spotify user authentication.

To start, please [duplicate/mirror](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/duplicating-a-repository)
this repo into your personal Github account. You are expected to commit your code into the mirror repo. Please
keep the mirror repo **private** to maintain the confidentiality of this process.

### Registering Your App with Spotify
To use the Spotify API, you need to set up your app with Spotify.

1. Go to the [Spotify developer portal](https://developer.spotify.com/dashboard/applications). You will need to log into
   your Spotify account (or sign up a new account if you don't have one) to use the developer portal.
2. Click "Create an App". Enter the app name "Playlist Generator" and a short description. Agree to the ToS and click "Create".
3. You are now in the app view. Take note of the Client ID that has been assigned to this app. You will need it later.
4. Click "Edit Settings". Under "Redirect URIs", add `http://localhost:3000/callback`, then click "Save".
5. Click "Users and Access". Add your own account as an authorized user who can log into your app.

You are now ready to build your app. For details, see the official Spotify [documentation](https://developer.spotify.com/documentation/general/guides/app-settings/).

### Submitting Your Work
When you are ready to submit your work, please follow these instructions:

1. Add the Github user [`tinkermode`](https://github.com/tinkermode) as a collaborator of your private repo, so that our team can review your code.
2. In our previous email to you, you should find a submission link at the end. Click the link to open the submission form.
   Copy and paste your repo URL into the "Notes" section of the form and submit. Our team will be notified and start reviewing your work.

Normally, we expect candidates to submit their work within 1 week of receiving this instruction.
If you have questions about this project, or need additional time due to unforeseen circumstances,
feel free to contact us.

Thank you again for your time. Good luck!


*&mdash;The MODE team*
