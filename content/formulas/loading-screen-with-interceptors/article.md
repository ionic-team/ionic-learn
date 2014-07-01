---
name: Using the Grid
author: Gerred Dillon
date: June 24, 2014
description: Get started with using Ionic's grid system to organize your content.
difficulty: beginner
reading_time: 5
category: Ionic Basics
kind: formula
draft: true
---

## Aligning the App

Even though Ionic ships with a lot of useful UI components for building native applications, sometimes more granular control is needed over layout. For this, Ionic provides a grid system to create UIs of any complexity.

Ionic's grid system uses the CSS Flexible Box Layout Module standard to provide customizability that would be otherwise difficult to achieve.

At it's simplist, Ionic's grid system is composed of divs with the class `row`, with divs having the class `col`

## Making equal splits

To make a row with equally spaced columns, simply nest the `col` divs within the `row` div:

~~~html
<div class="row">
  <div class="col">
    <button class="button button-block button-positive">Button</button>
  </div>
  <div class="col">
    <button class="button button-block">Button</button>
  </div>
</div>
~~~

## Adjusting the size

Columns can also be of varying sizes, and have differing offsets. Ionic has a multitude of percentage-based options for structuring the grid. This example shows a button that takes up half the screen, followed by a second button that is a half the size with a slight offset:

~~~html
<div class="row">
  <div class="col-50">
    <button class="button button-block button-positive">Button</button>
  </div>
  <div class="col-25 col-offset-10">
    <button class="button button-block">Button</button>
  </div>
</div>
~~~

Offsets can precede a column too. To push a large button to the right side of the screen, we can use the `col-offset-` series of classes:

~~~html
<div class="row">
  <div class="col-75 col-offset-25">
    <button class="button button-block button-energized">Button</button>
  </div>
</div>
~~~

## Going vertical

Because of Ionic's use of CSS flexbox, we can also use the grid vertically. Here are three placeholder images, all with a slightly different alignment of the caption text:

~~~html
<div class="row">
  <div class="col"><img src="http://placehold.it/280x150"></div>
  <div class="col">Caption Top</div>
</div>
<div class="row row-center">
  <div class="col"><img src="http://placehold.it/280x150"></div>
  <div class="col">Caption Middle</div>
</div>
<div class="row row-bottom">
  <div class="col"><img src="http://placehold.it/280x150"></div>
  <div class="col">Caption Middle</div>
</div>
~~~

If we need more granularity, we can do vertical alignment on the columns as well:

~~~html
<div class="row">
  <div class="col"><img src="http://placehold.it/150x190"></div>
  <div class="col col-top">Caption Top</div>
  <div class="col col-bottom">Caption bottom</div>
</div>
~~~

This example has two captions equally spaced with the image - one sits on top, and one sits on bottom.

The scratchpad below has everything you need to get started using Ionic's grid and endlessly customizing your apps!
