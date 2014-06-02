---
name: Build an App with Navigation and Routing - Part 2
tweet: Learn how to use navigation and routing with a complex Ionic app
author: Gerred Dillon
date: June 1, 2014
description: Now that we have basic routing, let's continue building our application
difficulty: intermediate
reading_time: 20
category: Navigation
kind: formula
---

Now that we have built a basic application with Ionic's navigation and routing stack, let's extend it to see some of it's more advanced features. If you haven't already, complete the [first part of this series.](/formulas/navigation-and-routing-part-1/)

Throughout this formula, we will construct a basic Todos system that maintains state as the app is navigated. To see the final code in action, check out the Scratchpad at the end of the formula.

## Changing our view

To start, let's alter our Home view to display a list of Todos. We can do this by changing our state declaration for `app.home` to the following:

~~~js
$stateProvider.state('app.todos', {
  url: '',
  views: {
    todos: {
      templateUrl: 'todos.html',
      controller: 'TodosCtrl'
    }
  }
})
~~~

Initially, this breaks our app, because we haven't updated our template to reflect the new state. Update your main template so that the tabs point to the correct place:

~~~html
<ion-nav-bar class="bar-positive">
</ion-nav-bar>
<ion-tabs class="tabs-positive">
  <ion-tab icon="ion-checkmark" ui-sref="app.todos">
    <ion-nav-view name="todos"></ion-nav-view>
  </ion-tab>
  <ion-tab icon="ion-help" ui-sref="app.help">
    <ion-nav-view name="help"></ion-nav-view>
  </ion-tab>
</ion-tabs>
~~~

We also need a template corresponding to the URL we registered with the router:

~~~html
<ion-view title="Todos">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="todo in todos" class="item item-icon-right">
        <span ng-class="{done: todo.done}">{{todo.title}}</span>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
~~~

If you have used the routing system before, or went through part 1 of this series, this should all look familiar. If not, check out part 1 of the series to get caught up.

We now have a list system, but no data. We will expand upon this later, but for now let's declare a TodosCtrl that will contain our Todos data, and pass it to the scope:

~~~js
app.controller('TodosCtrl', function($scope) {
  $scope.todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: false},
      {title: "Start cooking dinner", done: false}
   ]
})
~~~

When we refresh the page, a list of todos appears! This is fairly conventional by Angular standards. To make the done todos stand out, I added some simple styling to create a strikethrough of the text:

~~~css
.done {
  text-decoration: line-through;
}
~~~

### Getting Details

Now that we have our list, we want to be able to dive into a detail view for a particular todo. This will let us see more information (if there is any), and perform actions (such as completing it). Before we do this, we need to introduce an important concept in the routing system: abstract states.

Abstract states are a fairly simple concept in Ionic, and provide the structure necessary to handle advanced features like view nesting. Restructure your routing code to look like this:

~~~js
$stateProvider.state('app.todos', {
  abstract: true,
  url: '/todos',
  views: {
    todos: {
      template: '<ion-nav-view></ion-nav-view>'
    }
  }
})

$stateProvider.state('app.todos.index', {
  url: '',
  templateUrl: 'todos.html',
  controller: 'TodosCtrl'
})

$stateProvider.state('app.todos.detail', {
  url: '/:todo',
  templateUrl: 'todo.html',
  controller: 'TodoCtrl'
})
~~~

A lot has changed! With app.todos in play, we create a nested level of our state machine namespaced to `app.todos`, complete with sub-url routing. Notice that our abstract URL is just called `/todos`. This allows us to simplify our child URLs.

One more thing. Let's hook up the index's template to link to the detail, and create the detail template. Here's our new `todos.html`:

~~~html
<ion-view title="Todos">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="todo in todos"
        class="item item-icon-right"
        ui-sref="app.todos.detail({todo: $index})">
        <span ng-class="{done: todo.done}">{{todo.title}}</span>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
~~~

We've used the `ui-sref` directive before, but now we've added something new. This syntax allows us to pass in an object that specifies our link's parameters. In this case, we pass the todo's array index as a parameter.

And here's `todo.html`, representing our detail view:

~~~html
<ion-view title="Todo">
  <ion-content>
      <div class="item">
        <p>{{todo.title}}</p>
      </div>

      <div class="item item-checkbox">
        <div>
          <label class="checkbox">
            <input type="checkbox" ng-model="todo.done">
          </label>
          Done
        </div>

      </div>
  </ion-content>
</ion-view>
~~~

How does the detail view know which todo to use? The routing system doesn't support passing the object reference directly, so we will need a way to access the object. For this, we will need to create a TodosService that can be accessed by all parts of our app.

The detail state's URL has a parameter specified. This is important for passing data around in the router. In the next section, we will centralize our Todos data into a service and use this parameter to fetch that particular piece of data.

### Tying It All Together

If you have created a service in Angular before, this will be familiar. If not, we are using an AngularJS factory to create a singleton representation of our Todos, that can be read and updated from multiple sources. If you are new to the concept of services in Angular, [check out the documentation for services](https://docs.angularjs.org/guide/services).

~~~js
app.factory('TodosService', function() {
  var todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: false},
      {title: "Start cooking dinner", done: false}
   ]

  return {
    todos: todos,
    getTodo: function(index) {
      return todos[index]
    }
  }
})
~~~

Our `TodosCtrl` code now becomes:

~~~js
app.controller('TodosCtrl', function($scope, TodosService) {
  $scope.todos = TodosService.todos
})
~~~

Now we want to create a `TodoCtrl` that will manage our detail view. In the Angular digest cycle, the controller code is run last, however. What if we wanted to make sure our data was available before we rendered the route and made it available? This is particularly useful when making a request to the server for data when a route changes.

There are several ways to do this, but the router provides an easy way to do this with the `resolve` step. Change the `app.todos.detail` state to the following:

~~~js
$stateProvider.state('app.todos.detail', {
  url: '/:todo',
  templateUrl: 'todo.html',
  controller: 'TodoCtrl',
  resolve: {
    todo: function($stateParams, TodosService) {
      return TodosService.getTodo($stateParams.todo)
    }
  }
})
~~~

Resolve is an object whose keys map to values that can be injected in your state's controller. It will work with values or deferreds out of the box, making it particularly useful for asynchronous data loading. We can now setup a `TodoCtrl` to access this data:

~~~js
app.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
})
~~~

Run the app, and tap into a todo. We move into a detail view! Navigation state is also preserved at each level in the hierarchy. Try tapping on the help tab and back - you will still be in the detail view for the Todo.

However, we have left out one important thing: a back button.

### Going Back

Being able to dive into nested state isn't very useful if we can't escape from it. To do that, let's update the `ion-nav-bar` directive in `main.html` to look like:

~~~html
<ion-nav-bar class="bar-positive">
  <ion-nav-back-button class="button-clear">
    <i class="ion-arrow-left-c"></i> Back
  </ion-nav-back-button>
</ion-nav-bar>
~~~

The `ion-nav-back-button` is really smart. It understands when you move through the same level (or deeper levels) of the navigation hierarchy, and will give you the back button when necessary to traverse back up the stack. Run it now, and we find that we can go back and forth!

### Conclusion

We have now created the very basics of a Todos app, complete with a complex navigation hierarchy. In the final part of this series, we will add a side menu into the navigation stack, as well as the ability to create new todos.

In the meantime, customize your app, or check out our example down in the Scratchpad!
