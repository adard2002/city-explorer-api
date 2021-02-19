'use strict';
console.log('js is running!');


  const express = require('express');
  const cors = require('cors');
  const { response } = require('express');
  const PORT = process.env.PORT || 3111; 


  require('dotenv').config();
  // runs once and loads all the environmental variable. IF they were declared in a file instead the terminal.
  const app = express();
  // loading cors so the requests dont get blocked when they are local

  app.use(express.static('./public'));
  app.use(cors());

  // If user is taken to the home page the homepage will have text saying "You have found the home page!"
  app.get('/', (request, response) => {
    response.send('You have found the home page!');
  });


  // Map should show up if you have the API link in typed in the text box at the bottom of the city explorer site where it asks for an API key.
  // If the user has /location at the end of the link they will be taken to the location page which will bring up the searchedCity, display_name, lat, and lon
  app.get('/location', (req, res) => {
    try{
    const locationDataArray = require('./data/location.json'); // do localhost:3000/location to bring up a few names and latitude and longitude
    const locationDataObjFromJson = locationDataArray[0];
    const searchedCity = req.query.city;

    const newLocation = new Location(searchedCity, locationDataArray);
    res.status(200).json(newLocation);
    }
    catch(error){
      response.status(500).send(error + 'Something went wrong');
    }
  });

  // If the user is taken to the page with /weather at the very end of the link they will be taken to the location which displays the weather of the area they have searched for. The weather will show what the weather will be for 2 days, like tuesday and wednesday etc.
  // This does show up on the nodemon live port. But not on the city explorer site.
  app.get('/weather', (request, response) => {
    const weatherDataArray = require('./data/weather.json'); // Data retrieved from Weather.json file for the provided location
    const weatherDataOjbFromJson = [];

    weatherDataArray.data.map(weatherDaily => {
      weatherDataOjbFromJson.push(new Weather(weatherDaily));
    });
    response.send(weatherDataOjbFromJson);
  });

  // ====== Constructor functions for the Location and Weather ======
function Location(searchedCity, locationObject) {
  this.searchedCity = searchedCity;
  this.formatted_query = locationObject[0].display_name;
  this.latitude = locationObject[0].lat;
  this.longitude = locationObject[0].lon;
}

function Weather(weatherDataArray) {
  this.forecast = weatherDataArray.weather.description;
  this.time = weatherDataArray.valid_date;
}

  // ========== Error Handle Function ========

  function notFoundHandler(req, res) {
    console.error(error);
    res.status(404).json({
      notFound: true,
    });
    res.send('Error 404');
  }

app.use('*', (req, res) => res.send('Sorry, this route does not exist'));
app.use(notFoundHandler);

// ====== PORT listener ====== 
app.listen(PORT,() => console.log(`listening on port ${PORT}`));
