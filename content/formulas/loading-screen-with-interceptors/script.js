var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('root', {
    url: '/',
    template: '{{itemCtrl.item.name}}',
    controller: 'ItemCtrl as itemCtrl',
    resolve: {
      item: function(ItemsService) {
        return ItemsService.getItem()
      }
    }
  })
})

app.service('ItemsService', function($q) {
  return {
    getItem: function() {
      var dfd = $q.defer()

      setTimeout(function() {
        dfd.resolve({
          name: 'Mittens Cat'
        })
      }, 2000)

      return dfd.promise
    }
  }
})

app.controller('ItemCtrl', function(item) {
  this.item = item
})
