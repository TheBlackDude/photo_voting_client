***********************
Introduction & Settings
***********************

Introduction
============

Photo Voting is a very simple Ionic Application.
It demonstrate how to build a Ionic mobile application that communicate with a Backend API with the following features:

1. user registeration
2. authentication
3. taking pictures through the app
4. sending image to API Backend
4. voting on images

5. There's a base **Offline Mode** implemented but there's a problem with the `ionic network plugin <https://ionicframework.com/docs/native/network/>`__ . you can look at the *network.ts* and *offline-manager.ts* inside the *providers* folder to see how it's implemented 

There is a `django <https://github.com/TheBlackDude/photo_voting_api/>`__ backend api to test it with.
Go to the `repo <https://github.com/TheBlackDude/photo_voting_api/>`__ to see how to configure it.

Setup
=====

Clone the repository

Install dependencies
-------------

Run in project directory after you clone the repository:

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root to test basic features on the browser, but you can't take pictures

Build the app
=============

first make sure the backend API is running on the same network as the phone
----------------------------------------------------------------------------

- get your cumputer's `IP address`
- start the `backend API`
- connect the phone to the same `network` as the `computer backend API is running on`
- change the `devApiUrl` inside the `utils/Config.ts` file, from `http://localhost:8000/api/v1/` to `http://your_ip:8000/api/v1/`
- Run `ionic cordova build android` for Android if you are on Linux or Windows
- make sure your phone is on `debug mode`

This will build a `debug-apk`, after the build finish you'll see the output path, copy the `apk` to your phone and install it.

* Happy voting on images. :tada:

if you want to do live debuging
--------------------------------

- Connect the phone to your laptop
- On Chrome goto `chrome://inspect/#devices
- Once the app has started you'll see a inspect button click it and you'll have access to the console

To test the (voting, adding images and logout)
----------------------------------------------

- Adding Images once you login, click the + sign at the top.
- Voting, click on any image you want to vote on.
- Logout, click the key sign at the top.

