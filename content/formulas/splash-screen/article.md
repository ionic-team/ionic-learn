---
name: Customizing the Splash Screen
author: Gerred Dillon
date: July 21, 2014
description: When releasing an app, a nice final polish is a custom splash screen. Learn how to customize it with Ionic and ngCordova.
difficulty: beginner
reading_time: 15
category: Ionic Basics
kind: formula
scratchpad: false
---

Creating a custom splash screen in Ionic is simple. With ngCordova, it's even easier to customize to your needs.

## Making an App

To start, make a new Ionic app and add the platforms you intend to distribute on. To do this, we will use the `ionic` npm module binary. For iOS, you will need XCode Tools installed, and for Android, the Android SDK is required.

If you don't have the Ionic command line tool installed, make sure you have the latest Node.js and NPM installed. From there, `npm install -g ionic cordova ios-sim` will set you up with everything you need to simulate iOS apps with Ionic.

Once all of this is installed, setting up an Ionic app for the platforms is easy:

~~~
ionic start <appname> <template>
ionic platform add <platform>
~~~

In this formula, we will stick to iOS, but Android is very similar. Let's create a basic tabbed application:

~~~
ionic start splashscreenApp tabs
ionic platform add ios
~~~

From there, let's look the layout of our application. For brevity's sake, I'm only including the paths for our splash screen:

~~~
├── README.md
├── bower.json
├── config.xml
├── gulpfile.js
├── hooks
│   └── README.md
├── ionic.project
├── package.json
├── platforms
│   └── ios
│       ├── CordovaLib
│       ├── cordova
│       ├── platform_www
│       ├── splashscreen
│       │   ├── Resources
│       │   │   ├── de.lproj
│       │   │   ├── en.lproj
│       │   │   ├── es.lproj
│       │   │   ├── icons
│       │   │   ├── se.lproj
│       │   │   └── splash
│       │   │       ├── Default-568h@2x~iphone.png
│       │   │       ├── Default-Landscape@2x~ipad.png
│       │   │       ├── Default-Landscape~ipad.png
│       │   │       ├── Default-Portrait@2x~ipad.png
│       │   │       ├── Default-Portrait~ipad.png
│       │   │       ├── Default@2x~iphone.png
│       │   │       └── Default~iphone.png
│       ├── splashscreen.xcodeproj
│       └── www
├── plugins
├── scss
└── www
~~~

There's a lot of useful stuff here, but let's focus on what we need. For iOS, the splash screen resources are located under `platforms/ios/splashscreen/Resources/splash`, and a variety of images are required to accomodate every platform. Replacing these images will give you a custom splash screen.

## Customizing Further

Even though a custom splash screen is an important way to polish your app, it may not be enough. For applications that download a lot of data, or perform other operations, more control might be necessary over the display and hiding of the splash screen.

Before we install ngCordova, let's make sure the splash screen doesn't auto-hide. In your `config.xml`, adding `<preference name="AutoHideSplashScreen" value="false" />` will do this.

If you run the app with `ionic emulate ios`, the splash screen will now stay up forever. Let's install the splash screen plugin, and add `ngCordova` to our application to have control over this.

Adding the plugin is easy, and done with the `cordova` binary:

~~~
cordova plugin add org.apache.cordova.splashscreen
~~~

The plugin will be downloaded, installed, and made available. To control this through Ionic, install the `ngCordova` library.

## What is ngCordova?

[ngCordova](http://ngcordova.com/) is a library that exposes Cordova plugins through AngularJS services. It is a very powerful and simple way to get a lot more native control over your application. Install the binary with the instructions provided. Basically, just download the script, insert it into your `www/lib` folder, and add a script tag above `cordova.js`:

~~~html
<script src="lib/ngCordova/dist/ng-cordova.js"></script>
<script src="cordova.js"></script>
~~~

You will also need to declare it as a dependency of your AngularJS app:

~~~js
var app = angular.module('ionicApp', ['ionic', 'ngCordova'])
~~~

## Controlling the Splash Screen

Now that the splash screen is installed, let's hide it on completion of some task. In this case, we will do it 5 seconds after running:

~~~js
app.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
})
~~~

More likely, you will want to do it on resolution of some promise:

~~~js
app.run(function(MyDataService) {
  MyDataService.getThings().then(function(data) {
    $cordovaSplashscreen.hide()
  })
})
~~~

Even better if you do it in the `resolve` step within your routing layer. This is covered in more detail in another formula.

## Parting Words

Having direct control of your splash screen is an important part in creating that final polish over your application. Try it out, and let us know what you think!

## Update for PhoneGap Build

Per [@andrewmcgivery](https://twitter.com/andrewmcgivery), the configuration for disabling auto-hide is slightly different on PhoneGap Build. When configuring your PhoneGap Build app, the preference you need is:

~~~xml
<preference name="auto-hide-splash-screen" value="false" />
~~~

Thanks for the info, Andrew!
