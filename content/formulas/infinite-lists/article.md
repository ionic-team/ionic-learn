---
name: Exploring Ionic Lists
author: Gerred Dillon
date: May 13, 2014
description: Creating a basic list is easy and straightforward in Ionic. Ionic also supports infinite lists, reordering, and other things to make life easier when developing lists. This formula dives into what lists are about and how to get the most out of them.
difficulty: intermediate
reading_time: 10
category: Ionic Lists
kind: formula
---

## Infinite Lists

A major trend in iOS UI design is in the use of infinite lists. Whether it is a status feed, directory, or list of recipes, infinite lists provide a way for users to meaningfully navigate. On the web, pagination often works literally - by splitting content across multiple pages. Infinite lists do away with that.

To generate an infinite list in Ionic, we first need a list. Below is the markup and JS for a basic `ion-list`. To keep things simple, we are using an array of strings tracked by the index:

~~~html
<html ng-app="ionicApp">
  <body ng-controller="MainCtrl">
    <ion-header-bar class="bar-positive">
      <h1 class="title">Infinite List</h1>
    </ion-header-bar>
    <ion-content>
      <ion-list>
        <ion-item ng-repeat="item in items track by $index">
          <p>{{item}}</p>
        </ion-item>
       </ion-list>
    </ion-content>

  </body>
</html>
~~~

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.controller('MainCtrl', function($scope) {
  var currentStart = 0
  $scope.items = []


  $scope.addItems = function() {
    for (var i = currentStart; i < currentStart+20; i++) {
      $scope.items.push("Item " + i)
    }

    currentStart += 20
  }

  $scope.addItems()
})
~~~

This gives us a basic list with 20 items in it. Every time we call `$scope.addItems()`, we add 20 more items to the list. Straightforward. Right now, this only adds 20 items and is done. We want it to be infinite, and add 20 items until time runs out (or we run out of numbers).

Ionic ships with the `ion-infinite-scroll` directive. Its function is more like a scroll detector: it detects when a user is scrolled to a given point above the bottom of the view (default 1%, or 99% of the way down), and executes a function. To use this, all we need to do is add it to our view:

~~~html
<ion-list>
  <ion-item ng-repeat="item in items track by $index">
    <p>{{item}}</p>
  </ion-item>
  <ion-infinite-scroll on-infinite="addItems()"></ion-infinite-scroll>
</ion-list>
~~~

It's really important that when the action for our infinite scroll is complete, we broadcast the `scroll.infiniteScrollComplete` event. This lets the directive know we are done, and cleans up the scroller and re-binds the event for the next round of scrolling.

> **Note:** Remember to trigger the scroll.infiniteScrollComplete event when done. This can be done with `$scope.broadcast('scroll.infiniteScrollComplete')`. Without that, nothing will work properly after the first infinite scroll event triggers.
{: .note}

~~~js
$scope.addItems = function() {
  for (var i = currentStart; i < currentStart+20; i++) {
    $scope.items.push("Item " + i)
  }

  currentStart += 20
 $scope.$broadcast('scroll.infiniteScrollComplete')
}
~~~

That's about all there is to infinite lists. By firing the `scroll.infiniteScrollComplete` event when new data is ready, the list can properly update and remain in a state of infinite scroll. More information is available at the [documentation for ion-infinite-scroll](http://ionicframework.com/docs/api/directive/ionInfiniteScroll/).

## Reordering and swiping

Often, items in a list are ordered. This can be anything from a todo list to a series of bookmarks. Fortunately, Ionic has reordering built in. Reordering a list is initiated by toggling a reordering mode, much like how the delete mode is toggled. If you haven't seen the delete button implemented, check out an [Introduction to Lists in Ionic](/videos/intro-to-lists-in-ionic/) to find out more.

To create a reorder control, we'll start off with a normal looking list, with a Reorder button in the header:

~~~html
<html ng-app="ionicApp">
  <body ng-controller="MainCtrl">
    <ion-header-bar class="bar-positive">
      <h1 class="title">List Example</h1>
      <div class="buttons">
        <button class="button">Reorder</button>
      </div>
    </ion-header-bar>
    <ion-content>
      <ion-list>
        <ion-item ng-repeat="item in items">{{item.title}}</ion-item>
      </ion-list>
    </ion-content>

  </body>
</html>
~~~

To add some items and track what mode the view is in, we add a showReordering property to the scope:

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.controller('MainCtrl', function($scope) {
  $scope.items = [
    {title: "Item 1"},
    {title: "Item 2"},
    {title: "Item 3"},
    {title: "Item 4"},
    {title: "Item 5"},
  ]
  $scope.data = {
    showReordering: false
  }
})
~~~

At this point, we have a list with 5 items in it, ready for reordering and other things. First, we need to tell `ion-list` to look for the showReordering property and do something with it:

~~~html
<ion-list show-reorder="data.showReordering">
~~~

This indicates to `ion-list` that this list can be reordered, and to show the drawer when that functionality is enabled. When enabled, an `ion-reorder-button` will be shown, allowing users to grab the handle and move it around, calling a function when a reorder is completed. At this point, a button won't show. Why not?

To keep Ionic flexible, the actual UI elements for reordering elements is up to the user and not magically provided. Let's update our `ion-item` directive to include this:

~~~html
<ion-item ng-repeat="item in items">
  {{item.title}}
  <ion-reorder-button class="ion-navicon"></ion-reorder-button>
</ion-item>
~~~

We still don't see anything, and that's because we're not actually toggling a reordering. If you set $scope.data.showReordering to true, you'll see the handles on the right side. We can do one better by making the button actually toggle this:

~~~html
<button class="button" ng-click="data.showReordering = !data.showReordering">Reorder</button>
~~~

Run it, and now when the Reorder button is clicked, the drawer and item handles animate in and out. Without actually reordering items, though, this is just eyecandy. To actually reorder items, the `ion-reorder-button` has an `on-reorder` attribute that calls a function, and has two special variables available to it: `$fromIndex` and `$toIndex`.

These are generated by `ion-reorder-button` to let the developer figure out the index an item was drawn from and to. We can update our markup to reflect this:

~~~html
<ion-reorder-button class="ion-navicon"
                    on-reorder="reorderItem(item, $fromIndex, $toIndex)">
</ion-reorder-button>
~~~

All we need now is a reorderItem function to take care of this. For the simple case in this list, it's pretty easy. All we need to do is remove the item from its original spot in the array, and insert it at the new index. Two splices takes care of this:

~~~js
$scope.reorderItem = function(item, fromIndex, toIndex) {
  $scope.items.splice(fromIndex, 1)
  $scope.items.splice(toIndex, 0, item)
}
~~~

The last argument of splice is an item to insert into the array, making this a simple transformation. This function could also be used to make AJAX calls to update ordering on the server, or update the sortIndex of underlying data. We now have a fully functioning reorder control.

## What about custom list actions?

Ionic supports swiping items. This can be used to perform contextual actions on an item. The `can-swipe` directive (defaults to true) on `ion-list` and the `ion-option-button` allows just that. Returning to our basic list from above, we can try this out:

~~~html
<html ng-app="ionicApp">
  <body ng-controller="MainCtrl">
    <ion-header-bar class="bar-positive">
      <h1 class="title">Infinite List</h1>
    </ion-header-bar>
    <ion-content>
      <ion-list>
        <ion-item ng-repeat="item in items">
          {{item.title}}
          <ion-option-button class="button-positive" ng-click="editItem(item)">Edit</ion-option-button>
        </ion-item>
      </ion-list>
    </ion-content>

  </body>
</html>
~~~

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.controller('MainCtrl', function($scope) {
  $scope.items = [
    {title: "Item 1"},
    {title: "Item 2"},
    {title: "Item 3"},
    {title: "Item 4"},
    {title: "Item 5"},
  ]

  $scope.editItem = function(item) {
    item.title = "Edited Item"
  }
})
~~~

Everything about `ion-option-button` is standard AngularJS. Run this, and swipe any of the items to the left to reveal the contextual Edit button.

## Parting Notes

All of these can be combined and customized to make incredibly powerful lists built on very simple markup. Between infinite lists, reordering, deletion, and contextual options, Ionic ships with a multitude of functions for handling lists. The next formula in this series will discuss using custom gestures on lists to add even more advanced functionality, and discuss handling massive lists (with tens or hundreds of thousands of items) using `collection-repeat`.

The scratchpad below has a "kitchen sink" implementation with everything available on the infinite list we started in this formula.
