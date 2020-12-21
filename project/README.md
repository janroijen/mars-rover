# Mars Rovers
This project displays the most recent photos from NASA's three mars rovers. The backend of this app retrieves this information from
NASA's API and creates an API route for the frontend `{host}/rovers/'.

The design is largely based on: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_portfolio_gallery_filter

## Getting Started

We have supplied some of the foundational code for you. So follow these steps to get started:

1. Run
```yarn install``` 

**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In the repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.
