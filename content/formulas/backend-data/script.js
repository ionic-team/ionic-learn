var app = angular.module('ionicApp', ['ionic'])

app.controller('MainCtrl', function($scope) {
  var currentStart = 0
  $scope.data = {
    showReorder: false,
    showDelete: false
  }
  $scope.items = []


  $scope.addItems = function() {
    for (var i = currentStart; i < currentStart+20; i++) {
      $scope.items.push({title: "Item " + i})
    }

    currentStart += 20
    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

  $scope.editItem = function(item) {
    item.title = "Edited Item"
  }

  $scope.addItems()
})
