// Code goes here

var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')

  $stateProvider.state('app', {
    abstract: true,
    templateUrl: 'main.html'
  })

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
    controller: 'TodoCtrl',
    resolve: {
      todo: function($stateParams, TodosService) {
        return TodosService.getTodo($stateParams.todo)
      }
    }
  })


  $stateProvider.state('app.help', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
})

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

app.controller('TodosCtrl', function($scope, TodosService) {
  $scope.todos = TodosService.todos
})

app.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
})
