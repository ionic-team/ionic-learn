The side menu is a great way of adding a lot of functionality without taking up a lot of real estate. It's an easy element to add in Ionic and can be designed to slide out from the left or right.

We'll start with a basic Ionic app with a controller. I've already added a header with a button in for showing the side menu.

To start, let's add the click action for the side menu. We'll call the function toggleLeft.

To implement this on the controller, we need to bring in a service that will communicate with the side menus. This is the `$ionicSideMenuDelegate`. Inject it as a dependency and create the toggleLeft function. It's purpose is to call toggleLeft on the delegate.

At this point, we're ready to write markup. Create the ion-side-menus element, with an ion-side-menu. Here's where we specify the side.

We'll add some menu items and refresh. Immediately we can see something is wrong: our side menu is sitting on top of our main content!

This is because the side menu system has its own content element. If we create the `ion-side-menu-content` directive and place the header inside of it, we now have a working side menu.

In a formula, we will go over how to integrate the side menu with the rest of an Ionic application stack, including navigation, routing, and tabs.
