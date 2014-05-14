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
