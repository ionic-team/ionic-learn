---
name: Build an App with Navigation and Routing - Part 1
tweet: Learn how to use navigation and routing with a complex Ionic app
author: Gerred Dillon
date: May 29, 2014
description: It's easy to maintain state with a simple app. As size and complexity grows, so does the challenge of handling that state. In this formula, we will begin an application that takes advantage of Ionic's navigation and routing, and shows how to use it with Ionic's UI.
difficulty: intermediate
reading_time: 10
category: Navigation
kind: formula
---

This is the beginning of a multi-part series on Ionic's navigation and routing stack. We will start simple, by creating a simple application that can swap between tabs. As we progress, we will flesh out the features of a full todo app, and show some of the advanced features that Ionic's router has to offer.

To see the state of the application at the end of this formula, check out the Scratchpad below.

## The Need for Routing

When an app is small, it's easy to keep track of the current state of things. With only a few views, it's easy to conceptualize and track the flow of data through an app.

As our apps become larger and more complex, things become more difficult. Where is my scope coming from? What template should I render? Where am I rendering that template from? How do I nest into detail views? What if I'm in a detail view, change tabs, and come back?

A lot of questions start to rise, and a lot of boilerplate code is written trying to solve these problems. In effect, we end up writing our own state machines. That's where Ionic's navigation and angular-ui-router come into play to help solve these issues.


## Getting Started

To start, let's create the simplest possible implementation: display a single view using Ionic's router. From there, we will layer on more and more features until we have a full application.

Displaying a single view is as simple as the following HTML:

~~~html
<!DOCTYPE html>
<html ng-app="ionicApp">

  <head>
    <link data-require="ionic@1.0.0-beta6" data-semver="1.0.0-beta6" rel="stylesheet" href="http://code.ionicframework.com/1.0.0-beta.6/css/ionic.css" />
    <script data-require="ionic@1.0.0-beta6" data-semver="1.0.0-beta6" src="http://code.ionicframework.com/1.0.0-beta.6/js/ionic.bundle.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>

  <body>
    <ion-nav-view></ion-nav-view>
  </body>
</html>
~~~

The `ion-nav-view` is our container. Ionic's router will look for this directive throughout our code to insert templates. `ion-nav-view` supports inheritance, named views, and other features that we will discuss in depth throughout this series.

> **Note:** If you're familiar with `angular-ui-router`, `ion-nav-view` is equivalent to `ui-view`. On top of that, `ion-nav-view` provides for animations, history, and more.
{: .note}

Driving the HTML is something slighty more interesting:

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    template: '<p>Hello, world!</p>'
  })
})
~~~

To start, we setup a standard Angular app. In our config block, we inject `$stateProvider` and `$urlRouterProvider`. These provide the basic blocks necessary to configure our application's state machine.

Inside the config block, we can start declaring state. Here, we have declared a single one, and given it a template. When this is run, the template is injected where `ion-nav-view` is located in the parent template.

We can also use outside templates to keep markup out of our code.

~~~js
$stateProvider.state('home', {
  url: '/',
  templateUrl: 'home.js'
})
~~~

Changing the state declaration to use `templateUrl` will cause Angular to look inside of `$templateCache` for the template. If it's not in the cache, it will request it from the server and place it in the cache.

> **Note:** In the Scratchpad below, we use script tags with the type `text/ng-template` and an id of the page name. This will add the template to the template cache, and save us the request.
{: .note}

## Adding some navigation

Driving our states through the router isn't very useful when there's only one state. Let's modify our template to use tabs:

~~~html
<body>
  <ion-tabs class="tabs-positive">
    <ion-tab icon="ion-home" ui-sref="home">
      <ion-nav-view name="home"></ion-nav-view>
    </ion-tab>
    <ion-tab icon="ion-help" ui-sref="help">
      <ion-nav-view name="help"></ion-nav-view>
    </ion-tab>
  </ion-tabs>
</body>
~~~

Whoa, a lot changed! Let's break it down.

To start, all we've done is changed our app to use Ionic's `ion-tabs` directive. If you're not familiar with it, [check out the documentation on tabs](http://ionicframework.com/docs/api/directive/ionTabs/).

Our `ion-nav-view` directives have moved inside of our tab directive. There's two things to notice here. First, we have added a `name` attribute to `ion-nav-view`. Now that there is more than one `ion-nav-view` in our template at the same level in the heirarchy, we have to name our views. Without this, the router won't be able to correctly determine the proper place to insert the template, causing events to mis-fire and bugs to appear through the app.

Second, the tab itself has a `ui-sref` directive. This is like an `href` on anchors, but specifies the state we want to transition to. But to transition to another state, we need to add one! Here's the code:

~~~js
$stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
})
~~~

Named views change our state declaration slightly. We add a `views` key, which is an object of all of our sub-views. Within those is an object that takes the same parameters we would use when otherwise declaring a state. More information on named views [is available in the angular-ui-router docs](https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views).

Let's not forget about our templates. Add these in at the end of the `body`:

~~~html
<script type="text/ng-template" id="home.html">
  <ion-view title="Home">
    <ion-content padding="true">
      <h2>Home Page</h2>
      <p>Here's the main route for the app.</p>
    </ion-content>
  </ion-view>
</script>

<script type="text/ng-template" id="help.html">
  <ion-view title="Home">
    <ion-content padding="true">
       <h2>Using the app</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis architecto hic officia quasi excepturi sequi deleniti maiores consectetur veritatis sint?</p>
    </ion-content>
  </ion-view>
</script>
~~~

At this point, we have a simple app that we can tab through. It would be nice to have a header bar that is aware of our navigation stack, and could update its header accordingly. Let's add that.

## Adding a Header

Putting a header bar on is easy. Add the following before the `ion-tabs` directive:

~~~html
<ion-nav-bar class="bar-positive">
</ion-nav-bar>
~~~

Now when we run, we can see the header bar at the top of the screen, with correct titles. These titles are being driven by the `title` attribute of `ion-view`.

## Conclusion

We now have a basic app whose views are driven by a centralized state machine. In Part 2 of this formula, we will begin to add dynamic content to our views, as well as creating a list - detail hierarchy you can use
in your app's navigation. Stay tuned!
