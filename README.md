# Case study

Hello 👋 

Here is the repository answering the questions along with the case study.  
Original instructions are in [this PDF](./Sr.%20JS%20Engineer-case%20study%20(3).pdf).  
You can find the answer to to the questions in the [Questions.md](./Questions.md) file.  

## Running the project

- The runtime code is in the `/static` folder, tests are in the `/tests` folder. I'm using the `/static` folder so I can [deploy to cloudflare pages without configuring anything](https://developers.cloudflare.com/pages/platform/headers).
- The app is deployed on the following url: [https://tpxo6e.pages.dev/](https://tpxo6e.pages.dev/).
- I do not provide a development server (more on that choice later). To run the app I recommend running a local server, I personally used the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension.
  One can also start chrome with the flag the `--allow-file-access-from-files` and open the html file directly, however this has some security risks and I advise using a dev server instead.
- Run the tests with the [nodejs test runner](https://nodejs.org/api/test.html): `node --test`. Requires NodeJS v18 or NodeJS v20.

## 3 aspects I choose to focus on

### Design
I wanted to make it look decent without having to take design decisions so I copied the stock calculator on macOS. This turned out to be a great decisions as I could always refer back to that calculator to see how I want to handle UX and edge cases.

### Tests and testable code
Having a solid test suite is very important to me. This allows me to make changes with confidence so I am able to iterate on my solution.


### Ridiculously lean dev environment
So the assignment said "vanilla JS and no third party library". I wanted to take this further and do something that I have had on my mind for a while, you can think of it as "zen javascript": no bundler, no dev dependencies, only use the platform.  

## General remarks

### The "no bundler" approach led to some interesting consequences:
- I still wanted to be able to write test, so I tried out the nodejs built in test runner. It is fast! The entire test suite runs in ~100ms on my machine.
- No bundler also means very fast deploys as there is no transpile step, the app deploys in ~15seconds on cloudflare pages.
- Still I wanted at least part of my code to have typechecking, for this I relied on JSDoc and the built in typescript interpreter in VSCode.


### Code quality and testing

I'm not very satisfied of how the code turned out to be, but eventually it is better to turn in the assignment, as I can see myself endlessly refactoring and adding features to it.

The main problem in my approach is that I store the operands as `string`, and it would have much better to store them as `Number` for making the solution more extensible.  
Having the operands as number would make implementing things like localization or `BigInt` operations easier. It would also force us to write proper functions for parsing and formatting numbers, which I did not spend much effort on in this version.

### Solo project vs team project

I skipped on a few things because it is a solo project and not a team project.  
If I had team mates I would definitely have included:
- bundler/transpiler
- static checks (linting, type checking)
- a dev server
- formatting (prettier)

I tried to keep commits atomic and include good titles and descriptions *most of the time*. Your mileage may vary. In a team setting I would have paid more attention to it.

### Things that I left out of scope

It was surprising to see the number of features that a basic calculator has, and the non trivial complexity of making a simple calculator. For the interest of time I left the following features out of scope:

- AC/C functionality  
  Our calculator only does "All Clear" and does not implement "Clear". It would be however trivial to implement.
- Responsive styles and cross browser testing  
  While I did gave a quick look at the project in the latest version of Safari/Firefox/Chrome and iOS Safari, I did not focus on testing all functionalities there and making sure they work correctly.
- Percentage operator
- Conflicts between UI inputs and Native browser inputs  
  For an example, on Chrome macOS, a user can use `⌘+` to zoom in and `⌘-` to zoom out, this conflicts with the `+` and `-` inputs for the calculator. Another example is quickly tapping the buttons on a touch device, which will also trigger zoom.
- Localization  
  The calculator will always use `,` as a decimal separator and no thousands separators. Ideally it should display the number with a formatting matching the browser settings and support more number styles than arabic numerals.
- DOM Testing  
  I only added tests for the 'library' part of the code base, which does not depend on DOM APIs.  
  Ideally there should also be tests for `main.js` which handles all the DOM things, this can be achieved with fake DOM libraries like [JSDOM](https://github.com/jsdom/jsdom) or [happyDOM](https://github.com/capricorn86/happy-dom), or doing real automated in the browser with tools like [playwright](https://playwright.dev/), [cypress](https://www.cypress.io/) or [wdio](https://webdriver.io/)
