---
name: Integrating a Backend Service
author: Max Lynch
date: May 14, 2014
description: AngularJS makes interacting with backend data incredibly easy.
difficulty: beginner
reading_time: 10
category: Ionic AngularJS Backend
kind: formula
---

## Backend Services

What is a mobile app without interesting data? It seems nearly every app we used todayis sending and receiving data from a remote location, and letting us share our own data with the world.

Luckily, adding backend-powered functionality to a mobile app is incredibly easy with AngularJS.

### $http

Sometimes, all we need to do is make simple, periodic HTTP requests to a remote server. In those cases, the `$http` Angular service is exactly what we need:
 
~~~js
angular.module('ionicApp', [])

.controller('MainCtrl', function($scope, $http) {
 $http.get('https://cors-test.appspot.com/test').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
~~~

We can easily tie this request to our scope and have live updating of a server value:

~~~html
<body ng-app="ionicApp" ng-controller="MainCtrl">
The weather outside is {{conditions}}
</body>
~~~

Then, our `$http` call will update this with current weather conditions:

~~~js
angular.module('ionicApp', [])

.controller('MainCtrl', function($scope, $http) {
  $http.get('http://echo.jsontest.com/conditions/frightful').then(function(resp) {
    $scope.conditions = resp.data.conditions;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
});
~~~

In the example above we are using a simple JSON echo server for testing purposes, it just returns whatever JSON you want which can be useful for testing across the network.

In future formulas we will see how to do local testing of backend resources using AngularJS Mocks.

### ngResource

Often our backend data is modelled in a way that naturally fits into the client-side data models in our app. For example, if our app has a list of `Posts` that we show in a stream, a `Post` model becomes a core data element on both the server *and* the client.

Additionally, backend services that work on individual models like this often implement a RESTful API where we can easily create, read, update, and delete individual items, or grab lists of items.

For the sake of this example, let's assume we have an API for posts. This API has a few endpoints and access some common HTTP verbs:

~~~
GET /api/post - Lists all posts
POST /api/post - Creates a new Post
GET /api/post/:id - Returns the data for that specific post with the id of :id
PUT /api/post/:id - Updates the information for a specific post
DELETE /api/post/:id - Deletes the specific post
~~~

This style of API is a perfect use case for the built-in `ngResource` module in Angular. With `ngResource`, we can easily wrap this API and interact with it:

~~~js
angular.module('ionicApp', ['ngResource'])

.factory('Post', function($resource) {
  return $resource('/api/post');
});
~~~

In the example above, note we've added a requirement to import the `ngResource` module. You'll also need to include the `angular-resource.js` script include.

Notice we've also opted for an Angular Factory. This makes using a `Post` easy in our code, and we can treat it as a natural data model:

~~~js
angular.module('ionicApp', ['ionic', 'ngResource'])

.factory('Post', function($resource) {
  return $resource('/api/post/:id');
})

.controller('MainCtrl', function($scope, Post) {
  // Get all posts
  $scope.posts = Post.query();

  // Our form data for creating a new post with ng-model
  $scope.postData = {};
  $scope.newPost = function() {
    var post = new Post($scope.postData);
    post.$save();
  }
});
~~~

And then we can easily have a form for creating new posts:

~~~html
<body ng-app="ionicApp" ng-controller="MainCtrl">
  <ion-content padding="true">
    <form ng-submit="newPost()">
      <label>New Post:</label>
      <textarea ng-model="postData.text"></textarea>
      <button type="submit" class="button button-positive button-block">Create</button>
    </form>
  </ion-content>
</body>
~~~

When the user submits this form, the `newPost()` function is called, creating a new instance of our `Post` resource, and then calling `$save()` which does an HTTP `POST` to `/api/post`. 

To work correctly, our server should return a response similar to this:

~~~js
{
  "text": "I just ate a pickle",
  "id": 1
}
~~~

ngResource is a powerful module and has a lot of fun functionality. Be sure to take a look at the official [ngResource](https://docs.angularjs.org/api/ngResource/service/$resource) docs for more info. 

### Summary

Interacting with backend data is crucial for most mobile apps, and with AngularJS it's a breeze. For simple backend interactions, the `$http` module lets us do simple HTTP calls to an API end point.

For more complicated API interaction, especially when interacting with a RESTful API, `ngResource` provides a lot of abstractions over common API interactions.

When in doubt, `$http` can be used for small, one-off HTTP requests, and `ngResource` and the `$resource` service should be used for all API interactions that act on real data models.

Take a look at the simple code in the scratchpad below for an example of using `ngResource` and the `$resource` service:
