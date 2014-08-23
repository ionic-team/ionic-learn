---
name: Writing a Sass Theme
author: Mike Hartington
date: August 20, 2014
description: Customize your app's theme with Sass
difficulty: Intermediate
reading_time: 15
category: Ionic Style
kind: formula
scratchpad: false
---


## Sass Customization

In my last video, I went over the steps on how to set up Sass for an Ionic project. Now, let’s look at how you can override the variables in Ionic to make the colors your own.

## Setup

Let’s start a new Ionic project using Sass.

~~~bash
$ ionic start CustomSass blank && cd CustomSass
$ ionic setup sass
~~~

Now that we have Sass’s dependencies installed, let’s open up `ionic.app.scss` in the scss folder. By default, Ionic comes with these nine Sass variables:

~~~scss
$light:                           #fff !default;
$stable:                          #f8f8f8 !default;
$positive:                        #4a87ee !default;
$calm:                            #43cee6 !default;
$balanced:                        #66cc33 !default;
$energized:                       #f0b840 !default;
$assertive:                       #ef4e3a !default;
$royal:                           #8a6de9 !default;
$dark:                            #444 !default;
~~~

With these colors, you can completely redesign an app by simply changing the color. Let’s do that.

Open your `index.html`, and let’s change the markup to include a sample of Ionic’s components.

~~~html
  <ion-pane>
    <ion-header-bar class="bar-positive">
      <h1 class="title">myNetwork</h1>
    </ion-header-bar>
    <ion-header-bar class="bar-subheader bar-positive">
      <h1 class="title">Subheader</h1>
    </ion-header-bar>
    <ion-content class="padding">
      <ion-list>
        <button class="button button-positive">button</button>
        <button class="button button-block button-outline button-positive">
          Outlined Button
        </button>
        <button class="button button-block button-positive">Block Button</button>
        <button class="button button-block button-clear  button-positive">Clear Button</button>
        <ion-item href="#" class="item-positive">Item</ion-item>
        <ion-toggle toggle-class="toggle-positive">Toggle</ion-toggle>
        <div class="item range range-positive">
          <i class="icon ion-ios7-sunny-outline"></i>
          <input type="range" name="volume" min="0" max="100" value="33">
          <i class="icon ion-ios7-sunny"></i>
        </div>
        <a class="item" href="#">
          Badges
          <span class="badge badge-positive">0</span>
        </a>
      </ion-list>
    </ion-content>
    <ion-footer-bar class="bar-positive">
      <h1 class="title">Footer</h1>
    </ion-footer-bar>
  </ion-pane>
~~~

For this app, blue isn’t really the color I need, and neither are any of the other colors that came with Ionic. With plain CSS, you would have to dig through thousands of lines to isolate the colors you wanted to change and hope you got everything. But now, with Sass, we can simply change the `$positive` variable to the color we want. Doing this will update the background colors, borders, active colors, etc. For my app, I will change the color to teal.

~~~scss
/*
To customize the look and feel of Ionic, you can override the variables
in Ionic's _variables.scss file.
For example, you might change some of the default colors:
$light:                           #fff !default;
$stable:                          #f8f8f8 !default;
$positive:                        #4a87ee !default;
$calm:                            #43cee6 !default;
$balanced:                        #66cc33 !default;
$energized:                       #f0b840 !default;
$assertive:                       #ef4e3a !default;
$royal:                           #8a6de9 !default;
$dark:                            #444 !default;
*/

// The path for our Ionicon font files, relative to the built CSS in www/css
$ionicons-font-path: "../lib/ionic/fonts" !default;

// My custom color. I’ll override the default for $positive.
// Note that it’s before we load the rest of Ionic.
// This is important!
$positive:                        #057b6c !default;


// Include all of Ionic.
@import “www/lib/ionic/scss/ionic";

~~~

Save the file, and the app will instantly be updated. With one simple change, the entire feel of the app has changed. Pretty powerful stuff, huh? So, let’s add a little bit more to this.

## Custom Scroll Background

Changing the background of the scroll-view can be a nice touch that enhances the look and feel of an app. To do this, we’ll change the background to an image, using a variable. The variable will be the location of the image. For this example, we can use a placeholder image:

~~~scss
$big-bg:      'http://ioniconf.com/img/bg.jpg';
~~~

With this, we can set the background image to our `ion-content` by simply adding this:

~~~scss
.scroll-bg {
  background: url($big-bg) no-repeat center center fixed;
  background-size: cover;
}

~~~

~~~html
<ion-content class="padding scroll-bg">…</ion-content>
~~~

Now our `ion-content` has a great background image, and our content is teal.




## Parting Words
While this example only scratches the surface of working with Sass, it’s obvious how powerful it is. A developer only has to touch a few lines of code to completely change the look and feel of an app. I’d highly suggest learning more Sass to speed up your CSS development.
