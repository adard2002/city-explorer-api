const PORT = process.env.PORT || 3000;






app.listen(PORT,() => console.log(`listening on port ${PORT}`));

function Location(searchedCity, display_name, lat, lon) {
  this.searchedCity = searchedCity;
  this.formatted_query = display_name;
  this.latitude = parseFloat(lat);
  this.longitude = parseFloat(lon);
}