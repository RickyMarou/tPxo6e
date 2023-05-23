## Questions

### Which Web application that you created are you most proud of and why?

I will count a complete refactor of an existing app as a creation for this answer.
One of the last project I worked on at Shopify is the [Digital Downloads first party app](https://apps.shopify.com/digital-downloads).
It's a shopify app that allows merchants to sell digital goods.

I was the first member of the team that was spun up to take care of this project. When we inherited the
app, it had been in maintenance mode for seven years. It was actually live on production and used by merchants
for more than 10 years at that point.

The goal was to bring it up to date with the company technologies, especially because without some of these
upgrades, the app would end up being de-listed.
We had to port this Rails Turbolinks app to a React+Graphql app, overhaul the UI and completely redo the
authentication, on top of delivering value and new features. Oh did I mention that the development environnement was not working at all?

I am proud of coming up with the technical solution to do the upgrade in place and gradually: we could
bring value to merchant as soon as possible and also severely limit "big bang" deployments (sometimes called [StranglerFig pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)).
We had to make two different frontend framework (React and Turbolinks) coexist, on top of having both of them
integrating with the authentication framework.  
Making sure that everything played nice together required a deep understanding of how the browser works and
how each framework works. It also required a vision of where we want to end up and how to do we get there.  

I'm proud of the team that was able to execute so many critical upgrades while improving the reliability of
scalability of the app, all of this without disturbing the delivery of the 11Millions monthly orders that the
app was processing.  

### What was the most problematic web platform limitation that you have encountered while doing Web development? And how did you resolve it?

To be honest I never had to work on features or apps where web platform limitations were a big blocker.
I do monitor very closely upcoming platform features and the general state, so I am usually able to
tell ahead of time if a feature or app will be problematic to implement because of platform limitations.
Also, the web platform today is very capable!  

With all that said, the most problematic limitation I have run into is cross domain cookies, a.k.a 3rd party cookies while working on Shopify apps.  
Shopify apps are rendered inside an iframe inside the Shopify admin, and are hosted on their own domain.
In the past, authentication could be done by storing a cookie on the app, and both the shopify admin and
the shopify app could access it.  

But with the [advent of 3rd party cookie blocking](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), it was not possible to use this solution anymore.
I had to upgrade several applications to switch from this authentication mechanism to Shopify's OAuth mechanism.  
There is a high amount of effort involved as this meant re-doing the authentication from the ground up, on top of needing to have a good understanding of the OAuth mechanism.  

### Which new or upcoming Web technology are you most looking forward to and why?

If I have to pick one, then i'd pick [declarative shadow dom](https://developer.chrome.com/en/articles/declarative-shadow-dom/).  

I'll be honest, after many years of diving deep in React, I'm looking forward for the day it goes away.
Over the career of a software developer, we spend a lot of time learning framework specific knowledge
that will eventually turn out to be useless, and this is eventually every frontend framework destiny's.  

Declarative shadow fixes a major flaw of web components: they cannot be rendered on the server.  
It's also a much nicer experience to author and read HTML as HTML rather than using imperative javascript declarations (`createElement`, `appendChild`, etc...).  

Even if web components take over the mind share of frontend developers, there will always be frameworks,
but hopefully there will be very little framework specific knowledge in them. We can see this happening with [WebC](https://github.com/11ty/webc) for an example.  

### Which HTML, CSS and JavaScript features would you like to see introduced or removed in future revisions of the standards and why?

I feel like I should answer: "I wish for [manifest-v3](https://developer.chrome.com/docs/extensions/mv3/intro/) to be canned 😅".  

On a more personal note, I would love to see JSX become a part of the platform.
When I first came across JSX, like many other people, I had an allergic reaction and thought that facebook developers had lost their minds.  
In the meantime I was working on a SPA (the acronym didn't exist at that time) and was writing a lot of imperative javascript to create and manipulate DOM elements.  

There are a few reasons I would like to see JSX be a part of the web platform:
- I find using declarative programming patterns for creating and manipulating DOM elements quite elegant: it is way less code and much easier to reason about.
- It would give javascript a built in templating language, which will be great for the javascript ecosystem as a whole.
- We need to onboard to the web platform an entire generation of web developers raised with React, this will be a great olive branch extended to a very large part of the frontend developer population.

To be fair, [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) are not too far off, it allows the creation of library such as [htm](https://github.com/developit/htm) that are pretty close!
