# favesound-mobx

[![Build Status](https://travis-ci.org/rwieruch/favesound-mobx.svg?branch=master)](https://travis-ci.org/rwieruch/favesound-mobx) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/)

The SoundCloud Client in React + MobX made with passion. [Demo](http://www.favesound.de/), [Sibling Project: favesound-redux](https://github.com/rwieruch/favesound-redux)

## Includes

* react v. 16
* react-router v. 4
* mobx
* mobx-react
* normalizr
* lodash-fp
* airbnb-extended eslint
* enzyme v. 3
* Soundcloud API.

## Features

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

## Getting Started

Refactored from original version in Redux:
* [Demo](http://www.favesound.de/)
* [Repository](https://github.com/rwieruch/favesound-redux)

Create your own SoundCloud application:
* [Tutorial 1: The SoundCloud Client in React + Redux](http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/)
* [Tutorial 2: Refactoring to MobX](http://www.robinwieruch.de/mobx-react/).
* [Boilerplate: React + MobX + SoundCloud](https://github.com/rwieruch/react-mobx-soundcloud)

Feedback is more than appreciated via [GitHub](https://github.com/rwieruch), [Twitter](https://twitter.com/rwieruch) or my [Blog](http://www.robinwieruch.de/).

## Run

1. Clone Repository: `git clone git@github.com:rwieruch/favesound-mobx.git`
2. Exchange CLIENT_ID in `../src/constants/authentification.js` with your own from [SoundCloud for Developers](https://developers.soundcloud.com/) and use `http://localhost:8080/callback` as `Redirect_URI` for your Soundcloud App
3. `npm install`
4. `npm start`
5. visit http://localhost:8080
6. `npm test`

## Contribute

I am looking for contributors to make this project awesome! It doesn't matter if you are new to open source, I would welcome it!

