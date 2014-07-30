---
name: Navigating Ionic's Headers
author: Gerred Dillon
date: May 1, 2014
description: Ionic includes multiple ways to display a header at the top of the screen. Learn the difference between nav bars and header bars, and when to use each.
difficulty: beginner
reading_time: 3
category: Ionic Basics
kind: formula
---
There are several ways to create a header at the top of the screen in Ionic. Distinct differences exist between the navigation bar and the header bar and their uses within the framework. In this formula, we will create both types and explore the differences while introducing ourselves to Ionic's navigation view.

## A basic header

Placing a header bar on a view in Ionic is straightforward. The `ion-header-bar` directive lets us create an empty header bar on top of the screen:

~~~html
<!DOCTYPE html>
<html>

  <head>
    <link rel="stylesheet" href="http://code.ionicframework.com/1.0.0-beta.1/css/ionic.css" />
    <script src="http://code.ionicframework.com/1.0.0-beta.1/js/ionic.bundle.js"></script>
    <script>
      angular.module('ionicApp', ['ionic'])
    </script>
  </head>

  <body ng-app="ionicApp">
    <ion-header-bar class="bar-energized">
    </ion-header-bar>
  </body>

</html>
~~~

This creates an empty orange header bar across the top of the screen. By using the [colors guide](http://ionicframework.com/docs/components/#utility) in the [Ionic docs](http://ionicframework.com/docs/) we can change the bar's header by setting a color class prefixed by `bar-`.

> **Note:** In header bars of all forms, remember to prefix the color class with `bar-`. Several of Ionic's components use a prefix for styling. Find other directives that use a prefix in the [Ionic docs](http://ionicframework.com/docs/).
{: .note}

Now that we have an empty header bar, let's make it much more interesting by adding a title and buttons.

## Colors are great, but it's useless!

Typically, a header bar isn't just a nice orange blob on top of our screen. To make things more visually interesting (and begin adding functionality), let's add a title and some buttons:

~~~html
<ion-header-bar class="bar-energized">
  <div class="buttons">
    <button class="button icon ion-home">Home</button>
  </div>
  <h1 class="title">Our Awesome Header</h1>
  <div class="buttons">
    <button class="button button-clear icon ion-star"></button>
  </div>
</ion-header-bar>
~~~

Running this, we now have a view much more familiar to anybody who has used an app before. As we would expect in Angular, all data bindings work normally inside of `ion-header-bar` (and every other Ionic directive). We can bind anything in the header to the scope, and alter it to create dynamic headers, buttons, colors, or anything else that Angular can do.

That's the basics of `ion-header-bar`. There are a [lot of ways](http://ionicframework.com/docs/api/directive/ionHeaderBar/) to customize the header as your own.

The header bar is pretty simple, but there are some drawbacks to its simplicity. Ionic contains a full routing system built on ui-router that manages an app's navigation stack, letting users dive deep into nested views without losing their state elsewhere in the app. `ion-header-bar` is a UI directive and doesn't integrate other functions of Ionic on its own.

This makes `ion-header-bar` great for simple views that don't need complex state hierarchies, and is the thing to use when all you need is a header (or subheader) attached to any view. When things need to get more complex, that's where Ionic's navigation views and `ion-nav-bar` come into play.

## Navigate... this way

Our app is now getting more complicated. We now want to dive into a detail view to find more information about prior screens, add detail pages to the detail pages, and other things that make for a useful app. To do this, we refactor our codebase to a simple implementation of `ion-nav-view`:

~~~html
<body ng-app="ionicApp">
  <ion-nav-bar class="bar-energized nav-title-slide-ios7">
  </ion-nav-bar>
  <ion-nav-view></ion-nav-view>
</body>
~~~

Where'd our header go?! Running this code reveals an empty page. Considering we just removed it from our markup, this makes sense. A blank app is useful to nobody though. To restore balance to our app and see something more useful, we need to integrate Ionic's router.


In this instance, we will create the simplest possible implementation:

~~~html
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="http://code.ionicframework.com/1.0.0-beta.1/css/ionic.css" />
  <script src="http://code.ionicframework.com/1.0.0-beta.1/js/ionic.bundle.js"></script>
  <script>
    var app = angular.module('ionicApp', ['ionic'])

    app.config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')

      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
    })
  </script>
</head>

<body ng-app="ionicApp">
  <ion-nav-bar class="bar-energized nav-title-slide-ios7">
  </ion-nav-bar>
  <ion-nav-view></ion-nav-view>

  <script id='home.html' type='text/ng-template'>
    <ion-view title="Our Awesome Header">
      <ion-content>
        Here's the content for this page
      </ion-content>
    </ion-view>
  </script>
</body>

</html>
~~~

A lot has changed since the last example. We'll break it down into steps.

## 1. Configure Ionic's router

To activate Ionic's navigation system, we need to configure the router's states. To do this, we setup the states with `$stateProvider`, with `$urlRouterProvider` letting us specify the default route when loading the module. For the uninitiated to the router, it includes other options to help make complex tasks simple. To load the template, we specify the file. Angular will search `$templateCache` for this, and only request it if it's not already available in the cache.

In another formula we will go over Ionic's navigation in depth. For now, we will focus on adding a navbar.


## 2. Setup home.html view


To add home.html to the `$templateCache` when initializing Angular,  we add a script of type `text/ng-template` with an id of the page name. Within, we wrap everything within `ion-view`. The title attribute allows us to specify the title of the nav bar. `ion-content` gives a content space under the header where we can begin to place content.

Like that, we now have a state-aware header! This opens up a lot of possibilities to write easy, declarative markup to generate incredibly complex UIs. From here, it is pretty straightforward to start creating interesting state hierarchies.

### Navigating deep waters

Adding a detail page, complete with an animated view pushing on top of our old view and a button to take us back just builds on everything we have already done:

~~~html
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="http://code.ionicframework.com/1.0.0-beta.1/css/ionic.css" />
  <script src="http://code.ionicframework.com/1.0.0-beta.1/js/ionic.bundle.js"></script>
  <script>
    var app = angular.module('ionicApp', ['ionic'])

    app.config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')

      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('detail', {
        url: '/',
        templateUrl: 'detail.html'
      })
    })
  </script>
</head>

<body ng-app="ionicApp">
  <ion-nav-bar class="bar-energized nav-title-slide-ios7">
    <ion-nav-back-button class="button-clear">
      <i class="ion-arrow-left-c"></i> Back
    </ion-nav-back-button>
  </ion-nav-bar>
  <ion-nav-view></ion-nav-view>

  <script id='home.html' type='text/ng-template'>
    <ion-view title="Our Awesome Header">
      <ion-content>
        <p>Here's the content for this page</p>
        <a ui-sref="detail">Detail Page</a>
      </ion-content>
    </ion-view>
  </script>

    <script id='detail.html' type='text/ng-template'>
    <ion-view title="Detail Page">
      <ion-content>
        Here's a detail page
      </ion-content>
    </ion-view>
  </script>
</body>

</html>
~~~

Running this, we now have a link that will take us into a detail page, and tapping the back button will return us to our home. Several things make this possible. We have added a detail state by the name of detail, and the `ui-sref` directive on our anchor tag binds the link to the state defined in ui-router. The `ion-nav-back-button` directive inspects the state hierarchy to determine whether or not to display a back button. If the app can go back, the button is rendered, and the reverse is true.

## Contrasting the two

In the examples above and the scratchpad below, the differences between `ion-header-bar` and `ion-nav-bar` are clear. A standard header bar serves on its own as a pure UI element, ready for extension based on the developer's needs, but doesn't come with the advanced integration into Ionic's router and navigation stack. The nav bar is far more opinionated in its use, but offers a lot of power in return. Explore the scratchpad below to keep learning about the two, or check out the [Ionic documentation](ionicframework.com/docs/) and start building!
