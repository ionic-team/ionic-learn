---
name: Resolving Data the Right Way
author: Gerred Dillon
date: July 1, 2014
description: Handling data dependencies in your applications can be difficult. Learn how to use the router's resolve step to handle dependencies.
difficulty: intermediate
reading_time: 5
category: Ionic Data
kind: formula
---

## Getting Data Into a Controller

When fetching outside data, it can be very tempting to structure an application to resolve promises within a controller. Here's an example:

~~~js

app.controller('ItemCtrl', function($http) {
  var _this = this
  this.items = []

  $http.get('/resource.json').then(function(data) {
      _this.items = data.items
  })
})
~~~

This works, but is a bit messy. There is no encapsulation of our data, and we may have to repeat getting this resource across multiple controllers, making it not very DRY.

A first fix might be to abstract it up into a service, like so:

~~~js

app.controller('ItemCtrl', function(ItemsService) {
  this.items = []

  ItemsService.getItems().then(function(items) {
    this.items = items
  })
})
~~~

Although this is more expressive and encapsulates our items into a service with all of the advantages therein, there are still problems with this approach. Code for resolving our promises must still be maintained within each controller, and API changes to the Items resource can have widespread effects on our code.

Fortunately, Ionic's navigation system, backed by `ui-router`, handles this with its resolve phase. By handling the resolution of our promise outside of the controller, we drastically clean up the controller code, and abstract our logic up into our routing layer.
Here's an example of this in action:

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('root', {
    url: '/',
    template: '{{itemCtrl.item.name}}',
    controller: 'ItemCtrl as itemCtrl',
    resolve: {
      item: function(ItemsService) {
        return ItemsService.getItem()
      }
    }
  })
})

app.service('ItemsService', function($q) {
  return {
    getItem: function() {
      var dfd = $q.defer()

      setTimeout(function() {
        dfd.resolve({
          name: 'Mittens Cat'
        })
      }, 2000)

      return dfd.promise
    }
  }
})

app.controller('ItemCtrl', function(item) {
  this.item = item
})
~~~

Resolve understands promises when they are returned, avoiding any boilerplate code. Note that `resolve` consists of an object. The object's key specifies what the name of the injected results will be, while the value is a function that returns a value or a promise.

Because of this, our controller is reduced to a single line containing the resolved item. Check out the information below, and simplify fetching your data across your entire application.
