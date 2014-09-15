---
name: Using Local Storage
tweet: Use Local Storage for persisting data in your hybrid mobile apps with Ionic
author: Max Lynch
date: May 14, 2014
description: Mobile apps require seamless online and offline functionality, in large part due to the reliability of current mobile networks, and to reduce network requests that take time and hurt battery life. Learn how to use Local Storage to persist data for fast and reliable offline access.
difficulty: beginner
reading_time: 10
category: AngularJS
kind: formula
---

Being able to persist data locally in an app is crucial. The large variance in mobile network connectivity and the fact that users expect apps to reasonably function regardless of whether they are connected to the web or not means we need to make sure we store enough data locally to make the app function in these conditions.

Fortunately, with web technologies storing data locally is fast and easy.

## Local Storage


Browsers provide a convenient module for storing data in a simple key <-> value fashion called `localStorage`. This is an object on `window` that we can get and set String values easily with:

~~~js
window.localStorage['name'] = 'Max';

var name = window.localStorage['name'] || 'you';
alert('Hello, ' + name);
~~~

In this example, we set the `'name'` key to have the value `'Max'`. When we grab the value back using `localStorage['name']` we add a fallback return value of `'you'` in case the key doesn't have a value stored for it (just to be safe).

In localStorage, we can only set String values. But we'll see soon that this isn't much of a problem.

## Storing Objects

Since we can only store Strings in localStorage, how would we store objects? Well, we just have to convert them to JSON first!

~~~js
var post = {
  name: 'Thoughts',
  text: 'Today was a good day'
};

window.localStorage['post'] = JSON.stringify(post);

var post = JSON.parse(window.localStorage['post'] || '{}');
~~~

the `post` variable will now contain the full object. In fact, the same can be done for any kind of data: booleans, strings, numbers, arrays, and objects all serialize to and from JSON perfectly!

## iCloud Backup

When using `localStorage` in a mobile app that you intend to deploy to the Apple App Store, you must take into account iCloud storage and the iOS Data Storage Guidelines which suggest, among other things, that only data the user *creates* should be backed up to iCloud.

To make sure data stored in `localStorage` does not get backed up to iCloud and thus resulting in Apple rejecting your app for voilating the Data Storage Guidelines, make sure to set `BackupWebStorage` to `none` in your `config.xml` for Cordova/PhoneGap:

~~~xml
<!-- config.xml -->

<?xml version='1.0' encoding='utf-8'?>
<widget ...>
  <preference name="BackupWebStorage" value="none" />
</widget>
~~~

## AngularJS Service

Using `window.localStorage` directly is just fine, but having to set and parse Strings gets tiresome after a while. Use this simple AngularJS service for setting and retrieving data easily:

~~~js
angular.module('ionic.utils', [])

.factory('localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    get: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
}]);
~~~

And to use this service, just inject the `$localstorage` service into a controller or run function:

~~~js
angular.module('app', ['ionic', 'ionic.utils'])

.run(function($localstorage) {
  $localstorage.set('name', 'Max');
  
  console.log($localstorage.get('name'));
  
  $localstorage.set('post', {
    name: 'Thoughts',
    text: 'Today was a good day'
  });
  
  var post = $localstorage.get('post');
  console.log(post);
});
~~~

## Suggestions

Since Local Storage is a key-value store and can only store strings, it's no substitute for a real database. While encoding to and from JSON works great for most scenarios, frequent queries of large amounts of data can expose Local Storage’s weaknesses. We suggest using Local Storage to persist a small number of larger objects.

And stay tuned for upcoming [IndexedDB support](http://caniuse.com/indexeddb) in future mobile browsers, which will provide a more comprehensive local database option.

Try the scratchpad below for a runnable demo of this:
