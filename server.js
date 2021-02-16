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

  app.get('/', (request, response) => {
    response.send('You have found the home page!');
  });

  app.get('/location', (req, res) => {
    const dataArrFromLocationFile = require('./data/location.json'); // do localhost:3000/location to bring up a few names and latitude and longitude
    const dataObjFromJson = dataArrFromLocationFile[0];
    const searchedCity = req.query.city;

    const newLocation = new Location(
      searchedCity,
      dataObjFromJson.display_name,
      dataObjFromJson.lat,
      dataObjFromJson.lon
    );
    res.send(newLocation);
  });

  app.get('/weather', (request, response) => {
    const theDataArrayFromTheWeatherJson = require('./data/weather.json');
    const theDataOjbFromJson = theDataArrayFromTheWeatherJson.data[0];
    //   const searchedCity = request.query.city;
    const newWeather = new Weather (
      // searchedCity,
      theDataOjbFromJson.weather.description,
      theDataOjbFromJson.valid_date
    );
    response.send(newWeather);
  });

function Location(searchedCity, display_name, lat, lon) {
  this.searchedCity = searchedCity;
  this.formatted_query = display_name;
  this.latitude = parseFloat(lat);
  this.longitude = parseFloat(lon);
}

function Weather(weather, valid_date) {
  this.forecast = weather;
  this.time = valid_date;
}



app.listen(PORT,() => console.log(`listening on port ${PORT}`));
