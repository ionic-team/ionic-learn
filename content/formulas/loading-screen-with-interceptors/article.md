---
name: Global Loading Screen with Interceptors
author: Gerred Dillon
date: July 1, 2014
description: Centralize your loading code by using HTTP interceptors to do the dirty work
difficulty: advanced
reading_time: 10
category: Advanced Angular
kind: formula
---

## Showing a loading screen

Ionic ships with a built-in loading screen for making requests, disabling the UI and letting the user know that a blocking action is happening. To start, let's get familiar with `$ionicLoading` by making an API request to the Open Beer Database. We will also use the `jsonp` function of the `$http` directive to make a cross domain request.

~~~js
app.controller('MainCtrl', function($http, $ionicLoading) {
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })
  $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
    $ionicLoading.hide()
    _this.breweries = result.data.breweries
  })
})
~~~

This request is successful, and we can view a list of breweries. When this is run, a loading screen is shown, and disappears when the request finishes. While this achieves the intended effect, it is not exactly what we want.

In the above example, other controllers and services making HTTP request would have to make use of the same code, causing repetition throughout the codebase. Changes to the loading screen would have to be made in multiple places.

Even worse, our HTTP request (or service) must now concern itself with knowing about `$ionicLoading`, becoming tightly coupled to it's implementation. Fortunately, there's a better way.

## Enter HTTP interceptors

Angular's `$httpProvider` provider has the notion of interceptors, which allow us to inject code before a request is sent, and before a response is processed by a controller. Using this, we can centralize our app's loading code to one place, ensuring that it is easily maintainable.

As a result, there is more setup, as shown below:

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
})

app.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'foo'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})

app.controller('MainCtrl', function($http, $ionicLoading) {
  var _this = this

  $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
    _this.breweries = result.data.breweries
  })
})
~~~

There are two things we need to do to make sure this works. First, in our module's config step, we create the interceptor. Because we cannot inject $ionicLoading as a service into the interceptor, we must instead broadcast an event from $rootScope.

In our app's main run step, we listen for the appropriate events, and use `$ionicLoading` to show and hide the modal. When we run this, the effect is the same.

The advantage of this is that our controller or service does not know about the loading screen. We have achieved loose coupling throughout our application, and all of our HTTP requests will act the same throughout the app.

Check out the Scratchpad below for to see it in action!
