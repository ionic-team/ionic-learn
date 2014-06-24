---
name: Understanding Action Sheets
author: Gerred Dillon
date: June 24, 2014
description: Action sheets can be a useful UI for providing contextual actions. Learn how to create one, and use custom gestures as a bonus.
difficulty: intermediate
reading_time: 10
category: Ionic Basics
kind: formula
---

## Introducing Action Sheets

Action sheets are a very useful way of providing contextual actions on a component. They are simple to create with Ionic by using the `$ionicActionSheet` service exposed to developers. In Ionic, action sheets support multiple buttons, including destructive and cancel operations, in a simple interface.

In this formula, we will show how to open an action sheet. However, we will use the `on-hold` directive to only open the sheet when a particular todo is held for a certain amount of time.

## Opening an Action Sheet

In this particular example, we will start with the Javascript. Opening an action sheet is simple:

~~~js
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
~~~

It is critical to remember the `$ionicActionSheet` service. The `show` function of the service will display an action sheet using the provided attributes. In this case, we will have a three button action sheet. These will complete or delete a Todo, or exit in case we don't want to do either of those actions.

## Tap and hold

Other formulas will dive into the depths of using custom gestures within Ionic. In this example, we will use the `on-hold` directive to only call our function when we hold down on the particular element. The HTML for it is simple:

~~~html
<ion-list>
  <ion-item on-hold="showDetails()">Do Laundry</ion-item>
</ion-list>
~~~

There is a full list of events available in the [Ionic Documentation](http://ionicframework.com/docs/).

## Check it Out

In the scratchpad below, tap and hold on the Todo item to show the action sheet. From there, you can customize it to your liking.
