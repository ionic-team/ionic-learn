---
name: Pull to Refresh
author: Gerred Dillon
date: June 17, 2014
description: Update your lists in real time using pull-to-refresh with the handy ion-refresher directive!
difficulty: beginner
reading_time: 10
category: Ionic Basics
kind: formula
---

## Refreshing a List

Adding pull-to-refresh functionality to a list is easy in Ionic. To start, we create a basic Ionic list, but with one change. By prepending the `ion-refresher` directive outside of the list, we add everything we need:

~~~html
<body ng-app="ionicApp">
  <ion-header-bar class="bar-energized">
    <h1 class="title">Pull to Refresh!</h1>
  </ion-header-bar>
  <ion-content ng-controller="TodosCtrl">
    <ion-refresher pulling-text="Pull to refresh" on-refresh="doRefresh()">
    </ion-refresher>
    <ion-list>
      <ion-item ng-repeat="todo in todos">{{todo.name}}</ion-item>
    </ion-list>     
  </ion-content>

</body>
~~~

The `ion-refresher` directive takes several attributes, but the most important is the `on-refresh` handler. This will call the associated function on your controller. To setup the controller, we create a basic Ionic application:

~~~js
var app = angular.module('ionicApp', ['ionic'])

app.controller('TodosCtrl', function($scope) {
  $scope.todos =  [
    {name: "Do the dishes"},
    {name: "Take out the trash"}
  ]
  
  $scope.doRefresh = function() {
    $scope.todos.unshift({name: 'Incoming todo ' + Date.now()})
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };
  
})
~~~

Because we are making simple scope changes outside of the context of a digest cycle, we have to use `$scope.$apply()`. Typically, data will come from an external source, like ng-resource, Restangular, or the `$http` directive. In this case, we can use a promise and manually running a digest cycle is not necessary:

~~~js
$http.get('/my_resource')
.success(function(data) {
  $scope.resource = data.resource
})
.finally(function() {
  $scope.$broadcast('scroll.refreshComplete')
})
~~~

The important thing to remember here is that the `scroll.refreshComplete` event must be called to resume normal use of the list.

Check it out below in the Scratchpad!