var app = angular.module('ionicApp', ['ionic'])

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

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')

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

app.controller('TodosCtrl', function($scope, todos) {
  $scope.todos = todos
})

app.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
})
