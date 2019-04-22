### Overview: KickUp Coding Challenge

Hello and welcome to the KickUp Coding Challenge.  We're glad you were willing to take some time and complete this challenge, as it will help us to understand your skills in a fair and objective way!

The Challenge consists of two brief exercises in which we'll ask you to write a JavaScript function that completes a specific task. We've written some unit tests for each one, so you'll know that your code is working when the tests pass!

The first exercise involves making a function debouncer (the code for this is in `debounce.js` and `testDebounce.js`); the second exercise is around making updates to an immutable data structure (the code for this is in `update.js` and `testUpdate.js`).

To submit these exercises, we'd like you to download a zip of this gist, add in your changes, and then zip it back up and email it to us. We've tuned these exercises to ensure they should take 2-3 hours. The exercises are done when the tests pass, but if at the end of that time you don't have every test passing, please submit what you have! We'll be looking at solutions for cleanliness and robustness in addition to the test results; having a failing test or two isn't necessarily a disqualifier if the solution is otherwise well-factored and easy to understand.

Thanks again, and best of luck!
 
##### Running the tests

You'll need to have a somewhat recent version of node install on your machine; at least version 6.9.x or higher.  

Once you have downloaded and unzipped the gist, you can change to the unzip directory and just run:

```
# to install all dependencies:
npm install

# to run the update tests:
npm run test-update

# to run the debounce tests:
npm run test-debounce

# to run tests for both exercises:
npm run test-all
```

### Exercise One: Debounce

For our first exercise, we'll create a function debouncer, modeled off of `underscore`'s debounce.

Here's the basic usage of the file that you'll be creating:

```js
var debounce = require('./') // <- this is the file you make;

var sayHi = function() {
  console.log('hi');
};

var debounced = debounce(sayHi, 100);

debounced();
debounced();
debounced();
debounced();

// there should only be one 'hi' message on the console
```

More info: http://underscorejs.org/#debounce


#### Difference between debounce and throttle

There's a lot in common between debounce and throttle, [people sometimes confuse the two](https://github.com/kolodny/exercises/issues/3#issuecomment-111623806). The general difference between them is that throttle is used to make sure the function doesn't execute more than once per x milliseconds as opposed to debounce which makes sure that the function doesn't execute until x milliseconds passed without it being called.

For example: Let's say that you have a page that darkens the background based on how far down the page the user scrolled and also saves the scroll location on the server. In the case of smooth scrolling this function can end up being called hundreds of times per second. Assuming that checking the page scroll involves some fancy math and DOM touching this can end up causing the function to still be running as the next scroll event happens :( .

Let's assume the user is continuously scrolling the page...

In the case of darkening the background you would use a throttle function because you want to still darken the background even as new scroll events happen, just not as often as they come in.

In the case of saving the scroll position on the server, you wouldn't want it to be saved until after the user is done scrolling, so you would use the debounce function.


### Exercise Two: Implementing "Immutability Helper's" Update Function

For the second exercise, we'll be creating our own implementation of the `update` function in [Facebook's Immutability Helpers API](https://facebook.github.io/react/docs/update.html).

This library is a stand-alone utility intended to provide developers with an easier way to update immutable objects in JavaScript.  You see, in JavaScript, it is really easy to make deep updates to nested objects:

```
var theObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${a.b.c}`);

theObject.a.b.c = "New Text"

console.log(`New text is: ${a.b.c}`);

```

However, this changes the object you already have.  Sometimes, you don't want to change the original object, but instead create a new one that's based on the original, and also incorporates some changes.  JavaScript makes this tedious:

```
var originalObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${originalObject.a.b.c}`);

var updatedObject = extend(originalObject, {
  a: extend(originalObject.a, {
    b: extend(originalObject.a.b, {c: "New Text"}),
  }),
})

console.log(`New text is: ${updatedObject.a.b.c}`);

```

What would be nice is a syntax that would allows us to make these updates in a succinct way, while also being as memory efficient as possible.

Facebook's Immutability Help's defines such a syntax, which is executable through its `update` function.   Here's an example:

```
var originalObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${originalObject.a.b.c}`);

var updatedObject = update(originalObject, {
  a: {b: {c: {$set: "New Text"}}}
});

console.log(`New text is: ${updatedObject.a.b.c}`);
```

That's much more concise!

To explain what's going on here, the `$set` you see above is a "command" which tells the `update` function to create a new object based on `originalObject`, but with a different value at `a.b.c.`.  The API of Immutability Helpers defines 6 commands which you can send to the `update` function: `$push`, `$unshift`, `$splice`, `$set`, `$merge`, and `$apply`.  `update` never modifies the object that you pass to it, and allocates as few new objects as possible.  (You can find them all six of the commends documented [here](https://reactjs.org/docs/update.html#available-commands))

For this exercise, we're asking you to make an implementation of `update` which can handle all of these commands, and allocates as few new objects as possible without modifying the original object that is passed in as a parameter.

To help you, we've supplied unit tests in the file `testUpdate.js` which should help you understand whether the function is behaving as expected.  You'll know that the exercise is complete when you've implemented all of the commands and the tests pass!

We recommend that you start by reading Facebook's documentation on it's Immutability Helpers, which you can find [here](https://reactjs.org/docs/update.html).

(And one final note: while Immutability Helpers does ship with Facebook's React framework, the `update` function does not use or depend on React in anyway, and experience with React is not necessary to complete this exercise.)