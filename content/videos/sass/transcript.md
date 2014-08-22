To get started lets create an ionic project from the command line and cd into it.

The project will be called sass and it will be based off the tabs example

Out of the box, sass and it’s dependencies aren’t included but can be added by running `ionic setup sass`.

Alternatively you could manually things, but this command simplifies the process.

What this command does is downloads the gulp build tools needed for working with sass. Don't worry if you're unfamiliar with Gulp tasks because these will run in the background for you. However, we also make it easy to fully customize your gulpfile if you choose to.

We can startup up our app now with ionic serve. Here we can see we have the default styles for a tabs application. Our tab-bar is tabs-light and nav-bar is bar-light. Lets change this to use bar-positive and tabs-positive.

This command is a short cut to open my text editor, atom, in the current working directory.

So now we have a blue tabs-bar and a blue nav-bar. Lets navigate to the s-c-s-s folder and open the `ionic.app.scss` file.

Here we can see some variables used in ionic’s css. We can override these variables and use what ever color we would like. So since we’ve used the positive variable in our app, let’s go ahead and override it’s default value

As soon as we save this file, our sass will be compiled and our live preview will automatically be updated

In a formula we will expand on this sass file and start to create our own custom theme
