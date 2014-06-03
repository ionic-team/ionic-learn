Almost every mobile application has some form of tab bar interface. In this video, we are going to create one of those with Ionic.

Ionic has a built-in `ion-tabs` directive that we can use in order to build our tabbed interface. Create the `ion-tabs` directive and we can start filling it with tabs. The directive to create a tab is just the `ion-tab` directive. This takes a title, and this specifies what the title of our tab will be. I'm just going to call this one home, and in here I'm going to fill it with content with some text.

When we save this, we now have a tab that pops up with the text of "Home tab".

Let's add a second tab, because a single-tabbed app is pretty boring. I'm just going to call this one "About". I'm going to create some equally interesting content.

We can now swap between our tabs, and see that things happen! We may want to change the color scheme of our tabs. Ionic ships with several colors that are detailed in the documentation in the notes, but if we want to update that, we can set a class of `ion-tabs`.

Now, if we look in the documentation, the colors are unprefixed. If we want the blue color, we use the `positive` class. However, in the case of tabs, we want those to be able to be sub-customizable. For this, we have to prefix this class with 'tabs-'. Saving, we now see the nice color.

Let's add a header. This can be added with the `ion-header-bar` directive. Inside, we can set what we want the title to be. Let's set a color on it. This is interesting, but what if we want a different title for each section of the application?

You can set a navigation system up, which is detailed in more advanced videos and formulas. For the sake of simplicity in this video, we will create an `ion-header-bar` in each tab of our app. Copy the header bar, change the titles, and save. We now have updating headers across our tabs!

If you want to learn more about `ion-tabs`, check out the linked documentation. Thanks for watching!
