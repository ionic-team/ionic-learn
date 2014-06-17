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