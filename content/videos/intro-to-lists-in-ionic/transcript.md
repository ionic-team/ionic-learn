Let's talk about lists. Lists are a core UI element of any mobile app, and almost every app has some type of list. Because they are so essential to building an app, Ionic makes it easy to work with them.

Here, I have the basic skeleton for an Ionic app. To add a list, let's use the `ion-list` and `ion-item` directives. Creating a list of 5 items with these directives is pretty straightforward. When we refresh we can see that we have native-like scrolling and something that looks like a list.

It's worth noting this works like any other directive in Angular. It wouldn't be a list if we couldn't add some data. First, I'm going to add our Todos controller into the markup. Next, I'm going to create the controller on the JavaScript side.

Let's add some todos to our scope. I already have a few, for some chores around the house. Right now, the markup for our list is static and won't respond to updates. Let's change that using the `ng-repeat` directive. If you're new to AngularJS, and don't know what `ng-repeat` means, check out the notes for a link to the documentation on it.

Now that we're done, we can save, refresh, and check out our list to see that it's data driven. From our controller, we can remove items, add items, save, and watch it all update.

But it wouldn't really be a todo list if we couldn't add some items to it. Fortunately, adding to our list is as simple as adding to the todos array in our scope. For this example, I'm just going to add a header button. If this example looks unfamiliar to you, check out the formula for header bars in the notes.

We now have an add button that is pointing to an addTodo function on click, so let's wire that up. For our todo list, I'm just going to push a todo onto the end of our todos array. Now we can save, refresh, and try it out. When we click add, we watch the todos get added to the list.

No todo list would be complete without a delete function. Ionic ships with that function by letting you toggle a delete mode on your list. Let's add a flag to our scope to help us maintain that state.

Back in the markup add a `show-delete` directive to `ion-list`. This directive is used to determine if the list is in delete mode. If it is, the list will display a delete drawer next to each `ion-item` in the list. We also need a header button to toggle whether or not we are in delete mode. I'm just going to add a simple button that does that.

Right now, we don't actually have a delete button. Ionic is flexible in letting you decide exactly what that should look like. In this case I'm just going to replace our item with a standard looking delete button. When it's clicked, all we're going to do is splice that item out of the array and let the scope update.

Now when we add some items, we can toggle delete, and remove them from our array again. This gets us started with using lists in Ionic.

In the notes, I've linked to a formula that talks about lists more in depth. This includes infinite lists, reordering lists, and more. 
