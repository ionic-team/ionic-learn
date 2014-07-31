---
name: Adding an App Icon
author: Mike Hartington
date: August 1, 2014
description: Including an app icon is as simple as adding a few lines to a project config.xml
difficulty: beginner
reading_time: 15
category: Cordova
kind: formula
scratchpad: false
---

##Ionic App Icons

Developers spend so much time writing the code for their apps that sometimes, something as simple as an icon can get overlooked. Let’s go through the steps need to override the default Cordova icons with icons customized for apps.

##Make an App

For this lesson, I’ll focus on iOS, but the process for Android will be the same.
To start, let’s create a simple project from the CLI based on the side-menu template. If you do not have the ionic CLI installed, please refer to [Introduction to Ionic for iOS video][1]

With everything installed and set up, we can create the app.

~~~ bash
$ ionic start myIcon sidemenu
$ cd myIcon
$ ionic platform add ios
~~~

From here, we will make a new directory called “icons,” and inside it, we will make a directory for iOS.

~~~ bash
$ mkdir icons
$ cd icons
$ mkdir ios
$ cd ../../
~~~

Now, our whole project structure should look like this:

~~~ bash
.
|____bower.json
|____config.xml
|____gulpfile.js
|____hooks
|____ionic.project
|____merges
|____package.json
|____platforms
|____plugins
|____scss
|____www
|____icons
| |____ios
~~~

##Adding Icons to Your config.xml

From here, we want to edit the config.xml. The config.xml lets you specify the icons for each platform and where they are located in each project.

For iOS, we would add this:

~~~ xml
<platform name="ios">

  <!-- iOS 7.0+ -->
  <!-- iPhone / iPod Touch -->
  <icon src="icons/ios/icon-60.png" width="60" height="60" />
  <icon src="icons/ios/icon-60@2x.png" width="120" height="120" />

  <!-- iPad -->
  <icon src="icons/ios/icon-76.png" width="76" height="76" />
  <icon src="icons/ios/icon-76@2x.png" width="152" height="152" />

  <!-- iOS 6.1 -->
  <!-- Spotlight Icon -->
  <icon src="icons/ios/icon-40.png" width="40" height="40" />
  <icon src="icons/ios/icon-40@2x.png" width="80" height="80" />

  <!-- iPhone / iPod Touch -->
  <icon src="icons/ios/icon.png" width="57" height="57" />
  <icon src="icons/ios/icon@2x.png" width="114" height="114" />

  <!-- iPad -->
  <icon src="icons/ios/icon-72.png" width="72" height="72" />
  <icon src="icons/ios/icon-72@2x.png" width="144" height="144" />

  <!-- iPhone Spotlight and Settings Icon -->
  <icon src="icons/ios/icon-small.png" width="29" height="29" />
  <icon src="icons/ios/icon-small@2x.png" width="58" height="58" />

  <!-- iPad Spotlight and Settings Icon -->
  <icon src="icons/ios/icon-50.png" width="50" height="50" />
  <icon src="icons/ios/icon-50@2x.png" width="100" height="100" />
</platform>
~~~



Now, we can move all of our icons for iOS into the `icons/ios` folder and build iOS.

~~~ bash
$ ionic build ios
$ ionic emulate ios
~~~


As soon as the app launches, we can press cmd+shift+H to exit the app. Now, we’ll see our new, updated icon, instead of the default Cordova icon.


##Things to Remember

 • If you forget the include an icon in the folder, the CLI will prompt you that one is missing.

 • All the paths listed in this example are relative to the config.xml.

 • An icon is a simple but effective way to make your app stand out. Don't neglect it.

[1]:http://learn.ionicframework.com/videos/getting-started/
