---
name: "Installing Cordova and the Android SDK on Windows 7/8"
author: Max Lynch
date: June 30, 2014
difficulty: beginner
embed_code: //www.youtube.com/embed/RNrNIHQ9cWo
length: 14
description: A walkthrough on installing Cordova, Android, and Ionic on Windows 7 and 8
live: true
scratchpad: false
comments: true
---



##1: Download and Install Java

Download and install a [recent release](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) of the Java SDK for your computer.

You should be able to open a *new* instance of `cmd.exe` and run `java` without problems. If not (you made sure to open a *new* cmd window, right?), then open your system environment variables, and add to or create a new user variable called `PATH` with the full path to the `bin` folder of the new Java SDK installation.

##2: Download Apache Ant

Apache Ant is needed by Android and Cordova for building projects.

Download and extract this zip file somewhere on your computer: [http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip](http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip)

Add the full path to the `bin/` folder to the end of your PATH environment variable.

##3: Download the Android SDK

Go and download the [Android SDK](http://developer.android.com/sdk/index.html):

![Android](/img/formulas/windows-android/android.jpg)


##3: Add Android to PATH

We need to tell Windows where our Android SDK lives.

Open up your environment variables setting and add the full path to both the `adt-bundle/sdk/platform-tools/` folder and the `adt-bundle/sdk/tools/` folder to the end of your PATH variable:

![Android Env](/img/formulas/windows-android/android.jpg)

You should be able to open a *new* `cmd.exe` instance, and run `android` to see the list of android targets you can install.

Go ahead and install version 19 for now, which will give us support for developing for Android 4.4 (target older versions for older Androids).


##4: Install or update Node.js

Download the most recent version of [Node.js](http://nodejs.org/). If you are running an older version of Node, make sure to update it because older versions had issues with npm.

As with the other commands, `nodejs` should now function in `cmd.exe` but just to be careful, add the full path to the `bin` folder in Node to your `PATH`, which will look something like `C:\Program Files\nodejs\bin`.

##5: Install Cordova

Open a new `cmd.exe` window, and run:

~~~bash
$ npm install -g cordova
~~~

##6: Install Ionic

In the same `cmd.exe` window, run:

~~~bash
$ npm install -g ionic
~~~

##7: Start a project

Now that everything is installed, we can finally create an Ionic project! Go ahead and run:

~~~bash
$ ionic start myapp
$ ionic platform add android
~~~

Which should complete. If you run into an issue with an error related to `plugman` (a Cordova issue), you'll need to manually create the folder `$USER\AppData\Local\Temp\plugman\git` and run it again.

##8: Build, test, deploy!

Everything should be working now. To test it, try doing `ionic build android` and then connect a device or [Genymotion](http://www.genymotion.com/) instance and run `ionic run android`

Please let us know if you encounter any issues and we will revise this tutorial.
