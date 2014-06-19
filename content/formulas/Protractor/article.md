---
name: Protractor e2e Testing
tweet: Using Protractor to test ionic
author: Eric Wooley
date: June 18, 2014
description: Creating end to end tests can save you tons of headache and embarrassment. Creating the initial tests will take time, however, you will spend less time in the future testing every part of your app by hand. This formula demonstrates the basics of testing with protractor and Ionic, and using ripple in your end to end tests.
difficulty: intermediate
reading_time: 20
category: Testing
kind: formula
---

## Preparing to test
Start by ensuring protractor is installed.

`npm install -g protractor`

Use the web manager to install the chrome-driver and selenium server.

`web-driver update`

Spin up an Ionic server

`ionic serve`

Now you are ready to test!

## Protractor and Ionic in the Browser

Create a folder for your tests in your project, this example will use `YourProject/test/`.

~~~
cd YourProject
cd test
~~~

Create a protractor config file, example: `protractor.config.js`.

~~~
touch protractor.config.js
~~~

Add the following to `protractor.config.js`:

~~~js
exports.config = {
	  capabilities: {
	  	// You can use other browsers
	  	// like firefox, phantoms, safari, IE (-_-)
  		'browserName': 'chrome' 
	  },
	  specs: [
	  	 // We are going to make this file in a minute
		'e2e/becomeAwesome.spec.js'
	  ],
	  jasmineNodeOpts: {
	  	showColors: true,
	 	defaultTimeoutInterval: 30000,
		isVerbose: true,
	  },
	allScriptsTimeout: 20000,
  	onPrepare: function(){
		browser.driver.get('http://localhost:3000');
	}
};
~~~

For more on protractor configuration see [here](https://sourcegraph.com/github.com/exratione/protractor-selenium-server-vagrant/symbols/javascript/commonjs/test/protractor.conf.base.js/-/config).

## Writing Tests
*This is just a brief overview, for more on protractor testing see [this](http://www.ng-newsletter.com/posts/practical-protractor.html).*

Create a folder to house your end to end tests, example: `e2e`.

~~~
mkdir e2e
~~~

Create your first test

~~~
touch e2e/becomeAwesome.spec.js
~~~

*Tests in protractor heavily rely on [promises](https://github.com/kriskowal/q#tutorial) and use [jasmine 1.3](http://jasmine.github.io/1.3/introduction.html). Its recommended that you understand the basics of these in order to write better tests.*

Our example page will look like this:

~~~
<html>
	<head><!-- Include angularjs and all your awesome things--></head>
	<body>
		<p id='awesomeStatus'>I am not awesome</p>
		<button id='becomeAwesome'>Awesome</button>
	</body>
	<script type='text/javascript'>
		$('#becomeAwesome').on('click', function(){
			$('awesomeStatus').html('I am awesome')
		});
	</script>
</html>
~~~

Start with a basic descripe-it test in the file `e2e/becomeAwesome.spec.js`.

~~~js
// Describe a feature
describe('Becoming Awesome', function(){
	it('should start out not very awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am not awesome');
	});
	it('should become awesome', function(){
		element(by.id('becomeAwesome')).click();
	});
	it('should be awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am awesome');
	});
});
~~~

Now we are ready to run our test

~~~
protractor protractor.config.js
~~~

Protractor should automatically spin up a selenium server for you, then connect to it and a chrome window should pop up, click the awesome button, then fade away.

Your console should display that all of the tests have passed.

## Debugging your tests

Unfortunately, writing tests is still programming, as such is prone to it's own errors, so debugging is necessary. Lets says you screwed up **real bad**, and there is a subtle typo in your test.

~~~js
// Describe a feature
describe('Becoming Awesome', function(){
	it('should start out not very awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am not awesome');
	});
	it('should become awesome', function(){
		// This typo will cause the test to fail!
		element(by.id('awesomeTypo')).click();
	});
	it('should be awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am awesome');
	});
});
~~~

Because your test is *sooo* complicated, you are having a hard time figuring out whats causing the problem. 

Because of our misguided finger problem, and too-tired-to-see-the-typo eyes, all we know is that the test can't complete this line `element(by.id('awesomeTypo')).click();`. Here is where debugging comes in.

~~~js
// Describe a feature
describe('Becoming Awesome', function(){
	it('should start out not very awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am not awesome');
	});
	it('should become awesome', function(){
		 // Inserting a debugger statement here
		 // causes the browser to stop when it reaches this line.
		browser.debugger();
		element(by.id('awesomeTypo')).click();
	});
	it('should be awesome', function(){
		var awesomeStatus = element(by.id('awesomeStatus'));
		expect(awesomeStatus.getText()).toContain('I am awesome');
	});
});
~~~

Run protractor in debug mode with 

~~~
protractor debug protractor.config.js
~~~

The browser should stop when it reaches the `browser.debugger();` statement.

Now using your incredibly awesome powers of deduction, caffeine rejuvenated eyes, and the chrome developer tools: You would check the typo line, and compare it to the awesomeButton element in the dom. Hopefully, you would notice that the `awesomeButton` and `awesomeTypo` are not the same. Correct your horrific error and test on!

## Testing in Ripple
Chances are your app takes advantages of some of the Cordova plugins and the like and the vanilla browser probably didn't work to well for testing those features. We can use ripple to emulate them!

Start by installing ripple-emulator and running it

~~~
npm install -g ripple-emulator
cd YourApp
ripple emulate
~~~

Update `test/protractor.config.js` file to use the ripple server port

~~~js
exports.config = {
	  capabilities: {
	  	// You can use other browsers
	  	// like firefox, phantoms, safari, IE (-_-)
  		'browserName': 'chrome' 
	  },
	  specs: [
	  	 // We are going to make this file in a minute
		'e2e/becomeAwesome.spec.js'
	  ],
	  jasmineNodeOpts: {
	  	showColors: true,
	 	defaultTimeoutInterval: 30000,
		isVerbose: true,
	  },
	allScriptsTimeout: 20000,
  	onPrepare: function(){
  		// This will use cordova 3.0.0 and iPhone5 device in ripple, modify
  		// as needed.
		browser.driver.get('http://localhost:4400/?enableripple=cordova-3.0.0-iPhone5');
	}
};
~~~

Now run protractor

~~~
protractor protractor.config.js
~~~
You will notice that your tests run into some problems right away. Thats because ripple doesn't use angular, and loads your app into an iframe. There are two things we need to do to correct these issues. Update `test/protractor.config.js` to match this:

~~~js
exports.config = {
	  capabilities: {
	  	// You can use other browsers
	  	// like firefox, phantoms, safari, IE (-_-)
  		'browserName': 'chrome' 
	  },
	  specs: [
	  	 // We are going to make this file in a minute
		'e2e/becomeAwesome.spec.js'
	  ],
	  jasmineNodeOpts: {
	  	showColors: true,
	 	defaultTimeoutInterval: 30000,
		isVerbose: true,
	  },
	allScriptsTimeout: 20000,
  	onPrepare: function(){
		browser.driver.manage().window().maximize();  
		browser.driver.get('http://localhost:4400/?enableripple=cordova-3.0.0-iPhone5');
		// Enable this if you get syntonization errors from protractor, 
		// var ptor = protractor.getInstance();
		// ptor.ignoreSynchronization = true;   
		// Allow ripple to load
      		browser.sleep(2000);
		browser.driver.switchTo().frame(0);
	}
};
~~~

Your tests should run the same after the modifications, except for now they are inside a ripple emulator testing out all that sweet sweet Cordova functionality.

