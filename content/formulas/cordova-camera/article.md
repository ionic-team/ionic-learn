---
name: Using the Cordova Camera API
tweet: Add photos and video to your @cordova, @AngularJS, and Ionic mobile apps
author: Max Lynch
date: May 14, 2014
description: Taking photos and video is an everyday task for most mobile users. Learn how to easily add photo and video functionality to your apps with the Cordova Camera API.
difficulty: beginner
reading_time: 10
category: Cordova
kind: formula
scratchpad: false
---

Many apps use the functionality of the user's camera to add photo and video support to their apps. Adding media support to your app with the [Cordova Camera API](http://plugins.cordova.io/#/package/org.apache.cordova.camera) is a snap (yea, I just went there):

## Plugin

First, before we access the camera we need to install the Camera plugin. 

From the command line, `cd` into the directory for your current Ionic or Cordova app:

~~~bash
$ cd myApp
$ ls -l
total 40
-rw-rw-r--   1 driftyadmin  staff  2024 Apr 29 10:59 README.md
-rw-rw-r--   1 driftyadmin  staff   810 Apr 29 10:59 config.xml
-rw-rw-r--   1 driftyadmin  staff   620 Apr 29 10:59 gulpfile.js
drwxrwxr-x   4 driftyadmin  staff   136 Apr 29 10:59 hooks
-rw-rw-r--   1 driftyadmin  staff    74 Apr 29 10:59 ionic.project
-rw-rw-r--   1 driftyadmin  staff   253 Apr 29 10:59 package.json
drwxrwxr-x   3 driftyadmin  staff   102 Apr 30 09:46 platforms
drwxrwxr-x   5 driftyadmin  staff   170 Apr 29 10:59 plugins
drwxrwxr-x  11 driftyadmin  staff   374 Apr 29 10:59 www
driftyadmin@drifty:~/test/myApp$
~~~

You will see something different probably, but the above output is what the root directory of an Ionic/Cordova app looks like.

To install the plugin, run:

~~~bash
$ cordova plugin add org.apache.cordova.camera
~~~

This will install the Camera plugin and we can get down to adding Camera functionality to our app!

## Taking pictures

Now that we have the plugin installed, we can use the camera API from our Javascript:

~~~js

function takePicture() {
  navigator.camera.getPicture(function(imageURI) {

    // imageURI is the URL of the image that we can use for
    // an <img> element or backgroundImage.

  }, function(err) {

    // Ruh-roh, something bad happened

  }, cameraOptions);

~~~

This will prompt the user to take a photo, and will return the local URL of the image that you can then use inside of an `<img>` tag or use for a CSS background image.

`cameraOptions` is an optional object that allows you to configure many aspects of the camera operation. They are too numerous to list here, so be sure to take a look at the [Camera Plugin Docs](https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md) for a full list of the available features and options of the Camera plugin.

## AngularJS Service

What would a plugin be without an easy-to-use AngularJS service? Use the code below for a simple wrapper over the Camera plugin that makes it easy to asynchronously grab photos:

~~~js
module.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
~~~

This factory can be used in your controllers like this:

~~~js
.controller('MyCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };

~~~

Which will open the Camera when `getPhoto()` is called (from a button click, for example).

## AngularJS Whitelisting

Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows `file://` URLs (for example, if you are using `ng-src` for an `<img>` tag):

~~~js
module.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
~~~

## Example Project

For a quick example that ties all of the lessons here together, take a look at the [Cordova Camera](https://github.com/driftyco/ionic-example-cordova-camera) example app using Ionic! Here's a screenshot of it in action:

<img src="/img/formulas/camera/photo.png" class="screenshot">
