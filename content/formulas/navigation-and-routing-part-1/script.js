var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: '/home',
    views: {
      home: {
        templateUrl: 'home.html'
      }
    }
  })

  $stateProvider.state('help', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
})
