angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

angular.module('app', ['ionic', 'ionic.utils'])

.run(function($localstorage) {
  $localstorage.set('name', 'Max');
  console.log($localstorage.get('name'));
  $localstorage.setObject('post', {
    name: 'Thoughts',
    text: 'Today was a good day'
  });
  
  var post = $localstorage.getObject('post');
  console.log(post);
})


