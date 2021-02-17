'use strict';
console.log('js is running!');


  const express = require('express');
  const cors = require('cors');
  const PORT = process.env.PORT || 3000; 


  require('dotenv').config();
  // runs once and loads all the environmental variable. IF they were declared in a file instead the terminal.
  const app = express();
  // loading cors so the requests dont get blocked when they are local

  app.use(express.static('./public'));
  app.use(cors());

  // If user is taken to the home page the homepage will have text saying "You have found the home page!"
  // app.get('/', (request, response) => {
  //   response.send('You have found the home page!');
  // });


  // Map should show up if you have the API link in typed in the text box at the bottom of the city explorer site where it asks for an API key.
  // If the user has /location at the end of the link they will be taken to the location page which will bring up the searchedCity, display_name, lat, and lon
  app.get('/location', (req, res) => {
    const dataArrFromLocationFile = require('./data/location.json'); // do localhost:3000/location to bring up a few names and latitude and longitude
    const dataObjFromJson = dataArrFromLocationFile[0];
    const searchedCity = req.query.city;

    const newLocation = new Location(searchedCity, dataArrFromLocationFile);
    res.status(200).json(newLocation);
  });

  // If the user is taken to the page with /weather at the very end of the link they will be taken to the location which displays the weather of the area they have searched for. The weather will show what the weather will be for 2 days, like tuesday and wednesday etc.
  app.get('/weather', (request, response) => {
    const weatherDataArray = require('./data/weather.json'); // Data retrieved from Weather.json file for the provided location
    const dataOjbFromJson = weatherDataArray.data[0];
    //   const searchedCity = request.query.city;
    const newWeather = new Weather (
      // searchedCity,
      dataOjbFromJson.weather.description, //this returns a description of the weather "few clouds"
      dataOjbFromJson.valid_date //this returns the date of the day with the cooresponding weather
    );
    response.send(newWeather);
  });

  // Constructor functions for the Location and Weather
function Location(searchedCity, locationObject) {
  this.searchedCity = searchedCity;
  this.formatted_query = locationObject[0].display_name;
  this.latitude = locationObject[0].lat;
  this.longitude = locationObject[0].lon;
}

function Weather(weather, valid_date) {
  this.forecast = weather;
  this.time = valid_date;
}



app.listen(PORT,() => console.log(`listening on port ${PORT}`));
