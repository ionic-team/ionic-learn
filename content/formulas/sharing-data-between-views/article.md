---
name: Sharing Data Between Views
author: Gerred Dillon
date: July 7, 2014
description: Sharing data between views is easy. Doing it correctly is less easy. This formula will show best practices for sharing data across your application.
difficulty: intermediate
reading_time: 10
category: Ionic Data
kind: formula
---

## A Simple Detail View

Building detail-list view structures in mobile applications is a very common pattern. When this is static, it is easy to navigate through our application. If this is something you haven't seen before, check out our series on [the Ionic navigation stack](http://learn.ionicframework.com/formulas/navigation-and-routing-part-1/). This formula will use Ionic's navigation system, but we won't get into the details of how it works.

For now, let's build out a simple list-detail view, powered by Ionic's navigation system. The markup is straightforward, and includes two templates for our router to use:

~~~html
<ion-nav-bar class='bar-positive'>
  <ion-nav-back-button class="button-clear">
    <i class="ion-arrow-left-c"></i> Back
  </ion-nav-back-button>
</ion-nav-bar>
<ion-nav-view animation="slide-left-right"></ion-nav-view>

<script type="text/ng-template" id="todos.html">
  <ion-view title="Todos">
    <ion-content>
      <ion-list>
        <ion-item ng-repeat="todo in todos" ui-sref='todo({todoId: todo.id})' ng-class='{done: todo.done}'>{{todo.name}}</ion-item>
      </ion-list>
    </ion-content>
  </ion-view>
</script>

<script type="text/ng-template" id="todo.html">
  <ion-view title="Edit Todo">
    <ion-content>
      <div class="list">
        <label class="item item-input">
          <span class="input-label">Name</span>
          <input type="text" ng-model="todo.name">
        </label>
        <ion-toggle ng-model="todo.done" toggle-class="toggle-calm">Done</ion-toggle>
      </div>
    </ion-content>
  </ion-view>
</script>
~~~

This setups a basic `ion-nav-view` with two possible subviews. Let's wire this up to our application's Javascript:

~~~js
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')

  $stateProvider
  .state('todos', {
    url: '/todos',
    controller: 'TodosCtrl',
    templateUrl: 'todos.html'
  })
  .state('todo', {
    url: '/todos/:todoId',
    controller: 'TodoCtrl',
    templateUrl: 'todo.html'
  })
})

app.controller('TodosCtrl', function($scope) {
  $scope.todos = []
})

app.controller('TodoCtrl', function($scope) {
})
~~~

## Sharing Data with Services

We now have a basic, functioning app. We are missing a key element, however: data! It may be tempting to pass data around through the `$rootScope`, but this is problematic. To start, your data is now bound to the root scope, and can't be moved off into isolation. Not only is this harder to test, but it can't be used through multiple applications if need be.

There is also the matter of separation of concerns. Our controllers now know about model-level details, and the implementation of our todos system. There's a better way. By creating a service for our Todos application and injecting it where needed, we can clean up our code significantly:

~~~js
app.service('TodosService', function($q) {
  return {
    todos: [
      {
        id: '1',
        name: 'Pick up apples',
        done: false
      },
      {
        id: '2',
        name: 'Mow the lawn',
        done: true
      }
    ],
    getTodos: function() {
      return this.todos
    },
    getTodo: function(todoId) {
      var dfd = $q.defer()
      this.todos.forEach(function(todo) {
        if (todo.id === todoId) dfd.resolve(todo)
      })

      return dfd.promise
    }

  }
})
~~~

This is a basic service that allows us to get the full list of todos, as well as retrieve a single item. The only thing left is to get this into our controllers. To do that, let's use the `resolve` step of the router, and inject data into our controllers. This keeps our controllers from knowing about the details of the Todos service, and focuses on them using the data correctly. If this is unfamiliar to you, check out the formula on [data resolution with Ionic's router](http://learn.ionicframework.com/formulas/data-the-right-way/).

With that, our app config's states have changed slightly:

~~~js
$stateProvider
  .state('todos', {
    url: '/todos',
    controller: 'TodosCtrl',
    templateUrl: 'todos.html',
    resolve: {
      todos: function(TodosService) {
        return TodosService.getTodos()
      }
    }
  })
  .state('todo', {
    url: '/todos/:todoId',
    controller: 'TodoCtrl',
    templateUrl: 'todo.html',
    resolve: {
      todo: function($stateParams, TodosService) {
        return TodosService.getTodo($stateParams.todoId)
      }
    }
  })
})
~~~

Notice the new resolve step, which will ultimately make the relevant keys available for injection inside the route's controller. Our controllers, thus, also change a little:

~~~js
app.controller('TodosCtrl', function($scope, todos) {
  $scope.todos = todos
})

app.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
})
~~~

Notice that the controllers know nothing about the TodosService, only about the data relevant to them.

Check out the Scratchpad below to see this all in action!
