# Mars Rovers

## Introduction
This project was created as part of Udacity's [Intermediate JavaScript](https://www.udacity.com/course/intermediate-javascript-nanodegree--nd032) nanodegree, which I completed over Christmas break to reinforce my existing knowledge of JS and patch some gaps. The app displays the most recent photos from NASA's three mars rovers. The backend of this app retrieves this information from
NASA's API and creates an API route for the frontend `{host}/rovers/`.

## Approach

### Frontend
For the frontend, my goal was to create a dynamic webpage in a React-like fashion through functions that generate HTML through template strings. 

The generated HTML for the page is inserted into the DOM using the innerHTML method on the parent element in the webpage. This left the problem of how to set up event handlers, which I addressed by generating random IDs for elements that required event handlers and then attaching the handlers after the innerHML method has rendered the page.

The app lets the users choose between the three mars rovers. Whenever another rover is chosen, the whole page is forced to rerender, which is inefficient but made session in the context of my learning objective.

The user can enlarge the photos in the gallery by clicking on them. The design of the page was mainly based on a [W3 schools example](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_portfolio_gallery_filter), which I translated to a more functional programming style.

Unfortunately, one of Udacity's requirements was to use the Immutable library, which forces a cumbersome API for accessing objects on the whole project. I would have preferred to use the Immer library, which is used in Redux toolkit because it does not have this drawback.

Another requirement was using some higher-order functions. Therefore, some unstyled components are wrapped in a *styled* version. It is not truly CSS-in-JS though because it is just using inline element styling rather than adding style elements to the DOM.

### Backend
The backend is a simple Node.JS/Express server, which both queries the NASA API and serves the webpage. The route handlers in *handlers.js* query NASA's API for the three rovers separately, and then combine the results in a new object that is more closely aligned with the needs of the frontend. The three requests to NASA's API are processed concurrently and the resolution of the requests is aligned through a *Promise.all* call.

## Getting Started

Please follow these steps to get started:

1. Run ```yarn install```. If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In the repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.
