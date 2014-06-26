---
name: Making Modals
author: Gerred Dillon
date: June 26, 2014
description: Modals are an essential UI component of any app needing to show a detail view. This formula goes into the details of making those modals.
difficulty: beginner
reading_time: 10
category: Ionic Basics
kind: formula
---
## The Structure of a Modal

In Ionic, modals are provided by the `$ionicModal` directive. This is pretty easy to use and powerful, with a lot of [information available in the documentation](http://ionicframework.com/docs/api/service/$ionicModal/). Ionic's modal allows creation from either a template string or a URL. In this formula, we will use a URL.

Modals are created with a scope. This can be used in simple examples to pass data. However, for more complicated examples, shared data access is best done through a service.

## Making the Modal's Markup

Creating a modal is simple. First, let's create our UI. This example will be a simple contact view. Tapping the contact card will allow it to be edited.

~~~html
<ion-header-bar class="bar-energized">
  <h1 class="title">Contact Info</h1>
</ion-header-bar>
<ion-content>
<div class="card" ng-controller='MainCtrl' ng-click="openModal()">
  <div class="item item-divider">
    {{contact.name}}
  </div>
  <div class="item item-text-wrap">
    {{contact.info}}
  </div>
</div>
</ion-content>
~~~

Right now, this looks pretty standard - the only reference to the modal is a scope function. What this example is lacking is our actual contact modal. Add it inline to the markup:

~~~html
<script id="contact-modal.html" type="text/ng-template">
  <div class="modal">
    <ion-header-bar>
      <h1 class="title">Edit Contact</h1>
    </ion-header-bar>
    <ion-content>
      <div class="list">
        <label class="item item-input">
          <span class="input-label">Name</span>
          <input type="text" ng-model="contact.name">
        </label>
        <label class="item item-input">
          <span class="input-label">Info</span>
          <input type="text" ng-model="contact.info">
        </label>
      </div>

      <button class="button button-full button-energized" ng-click="closeModal()">Done</button>
    </ion-content>
  </div>
</script>
~~~

In production, you may want to separate your templates into separate files or add them to the `templateCache`. Like many other parts of Ionic that use templates, Angular will first search in the `templateCache` for files it needs.

## Showing the Modal

The controller code for the modal is very simple. We make sure to inject `$ionicModal` for use in our controller:

~~~js
app.controller('MainCtrl', function($scope, $ionicModal) {
  $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  }

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})
~~~

Ionic's modal uses a deferred. This is so that it can asynchronously access the template cache and build the modal up. We can pass in a scope, which defaults to the `$rootScope` if none is supplied. An animation is also allowed. There are many more options available in the documentation.

Once the modal has been defined, the deferred allows us to set the modal. A modal then has several functions. In this case, we care about the `show`, `hide`, and `remove` functions. The `remove` function is particularly important. By listening to the `$destroy` event on the scope, we can make sure to garbage collect our modal. Omitting this would cause a memory leak in your app!

## Parting Notes

Check out the modal below in the Scratchpad to see how the pieces work together. A modal is a very powerful UI component when executed correctly, and Ionic makes it easy to display and use modals in your application.
