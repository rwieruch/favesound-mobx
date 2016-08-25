# favesound-mobx

The SoundCloud Client in React + MobX made with passion!

Uses mobx, mobx-react, normalizr, react, lodash-fp, airbnb-extended eslint, enzyme and the Soundcloud API.

![FaveSound](https://s15.postimg.org/3t5581x2j/Screen_Shot_2016_08_25_at_15_18_44.png)

Features:
* login to SoundCloud
* show your personal stream
* show favorite tracks, followers and followings
* inifite scroll + paginated fetching
* follow people
* like tracks
* player play/stop/forward/backward track
* playlist
* sort tracks by plays, likes, comments, reposts, downloads
* filter tracks by duration
* search tracks by name and artist

Refactored from original version in Redux: 
* [Live](http://www.favesound.de/)
* [Repository](https://github.com/rwieruch/favesound-redux)

Create your own SoundCloud application:
* [React + MobX + SoundCloud Boilerplate Project](https://github.com/rwieruch/react-mobx-soundcloud)
* [Tutorial 1: The SoundCloud Client in React + Redux](http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/)
* [Tutorial 2: Refactoring to MobX](http://www.robinwieruch.de/mobx-react/).

Feedback is more than appreciated via [GitHub](https://github.com/rwieruch), [Twitter](https://twitter.com/rwieruch) or my [Blog](http://www.robinwieruch.de/).

## Run

1. Clone Repository: `git clone git@github.com:rwieruch/favesound-mobx.git`
2. Exchange CLIENT_ID in `../src/constants/authentification.js` with your own from [SoundCloud for Developers](https://developers.soundcloud.com/) and use `http://localhost:8080/callback` as `Redirect_URI` for your Soundcloud App
3. npm install
4. npm start
5. npm test

## Contribute

I am looking for contributors to make this project awesome! It doesn't matter if you are new to open source, I would welcome it!

