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

function Location(searchedCity, display_name, lat, lon) {
  this.searchedCity = searchedCity;
  this.formatted_query = display_name;
  this.latitude = parseFloat(lat);
  this.longitude = parseFloat(lon);
}



app.listen(PORT,() => console.log(`listening on port ${PORT}`));
