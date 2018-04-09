# A Weather Application using Node JS.

Fetches the weather using DarkSky API and Google Maps API. Front-end is done using simple Bootstrap classes.

## Link: [The Weather Application](https://salty-tor-62006.herokuapp.com/)

#### Important notes:

- When deploying an app with 'http:/localhost:1234' links inside the forms, buttons or navbars, they have to be left empty because Heroku will manage the port accordingly.
- Declaring a `const port = process.env.PORT` is essential and reduces the userhead exclusively.
- The Application fetches unexpected or unwanted results when the input is too short or not accurate like: {1, 2, 3, a, b, c, bom, dom, etc.,}
