---
name: Customizing the Status Bar
author: Gerred Dillon
date: July 23rd, 2014
description: An easy and quick way to personalize your applications is by customizing the status bar. Learn how to with the ngCordova plugin.
difficulty: beginner
reading_time: 10
category: Cordova
kind: formula
scratchpad: false
---

## Creating an App

To customize the status bar in an Ionic application, we can use the Cordova status bar plugin. Given an Ionic app with installed platforms (if you haven't done this before, see [this article on customizing the splash screen](http://learn.ionicframework.com/formulas/splash-screen/)), install the status bar plugin:

~~~
cordova plugin add org.apache.cordova.statusbar
~~~

From there, with the [ngCordova](http://ngcordova.com/) module installed, we get a new service called `$cordovaStatusBar` exposed to our controllers.

For example, we can adjust the base style of our status bar:

~~~js
var app = angular.module('ionicApp', ['ionic', 'ngCordova'])

app.run(function($cordovaStatusbar) {
  $cordovaStatusbar.overlaysWebView(true)

  $cordovaStatusBar.style(1) //Light
  $cordovaStatusBar.style(2) //Black, transulcent
  $cordovaStatusBar.style(3) //Black, opaque
})
~~~

We even have the ability to control the color of the status bar, if your platform supports it:

~~~js
$cordovaStatusbar.styleColor('black')

$cordovaStatusbar.styleHex('#FF0000') //red
~~~

Depending on what you're doing, such as displaying an image gallery, you can hide the status bar:

~~~js
$cordovaStatusbar.hide()

$scope.toggleStatusbar = function() {
  $cordovaStatusbar.isVisible() ? $cordovaStatusbar.hide() : $cordovaStatusbar.show()
}
~~~

Notice that we've added a toggle status bar function. This could be useful to show the status bar when an image is tapped on. With the addition of a throttling function and a delay, a very native-like experience can be achieved.

## Parting Words

Changing the status bar to suit your needs is very simple, but adds a level of polish to your application. Subtle details matter in creating a native experience, so don't forget to check out the status bar. For more polish, [customize your splash screen](http://learn.ionicframework.com/formulas/splash-screen/).
