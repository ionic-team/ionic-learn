# Getting Started

## Intro

In this video we will learn about Ionic Framework for iOS development. Ionic Framework is a front-end framework for developing hybrid mobile apps with HTML5.

## Prerequisites

To start using Ionic with iOS, you will need MacOSX with XCode, the XCode Command Line Tools, and node.js installed. Instructions for installing these pre-requisites are in the notes for this video.

## Node Modules

Once you finish installing the pre-requisites, install Ionic from the Node Package Manager (NPM). If you are new to Node.js, NPM is a package manager for node.js that will resolve your dependencies. Install Ionic now with `npm install -g ionic cordova ios-sim`.

## Explain Modules
These modules are the basis for working with Ionic on iOS. The `ionic` module itself is the primary command line tool you will be working with. Cordova is Ionic's underlying platform for building native mobile applications using HTML, CSS, and JavaScript. The `ios-sim` module allows us to run the iOS simulator from the command line.

## Template Talk
We can now begin building apps with Ionic. Ionic ships with several templates, but we will start with a tabbed app. You can learn about other templates in the Getting Started guide in the notes for this video.

## Ionic Start
To start a new tab-based application, type `ionic start tabsApp tabs`.

## Looking at Contents
This will create a folder called tabsApp, so change into the folder. When we look at the folder's contents, we can see there is a lot happening. In the next video, we will break down the structure of an Ionic app and change our application. For now, we will get the application running in the iOS simulator.


## Add Platforms
An Ionic application does not ship with any platforms installed. To turn our app into something runnable on a device, we need to add specific platforms we want to use. In this case, we want iOS. In the terminal, type `ionic platform add ios`. Once Ionic resolves its dependencies, we can run the application. 

## Run
Type `ionic emulate ios` to run the iOS simulator.


## Emulate
Once it's running, we can now see that we have a working tabbed application. In the next video, we will talk about the structure of an Ionic project and begin customizing our app.
