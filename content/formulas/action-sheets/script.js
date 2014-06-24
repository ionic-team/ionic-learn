var app = angular.module('ionicApp', ['ionic'])

app.controller('MainCtrl', function($scope, $ionicActionSheet) {
  $scope.showDetails = function() {
    $ionicActionSheet.show({
     buttons: [
       { text: 'Complete' }
     ],
     destructiveText: 'Delete',
     titleText: 'Update Todo',
     cancelText: 'Cancel',
     buttonClicked: function(index) {
       return true;
     }
   });

  }
})
