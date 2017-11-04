const express = require('express');
const router  = express.Router();
const request = require('request');
const key     = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";

// process-req.body : req.body -> ???
// function process-req.body(req.body) {
//      ...(req.body.persons_lat)...
//      ...(req.body.persons_lon)...
//      ...(req.body.location_accuracy)...
// }

function giveCityNameLW(parsed_object) {
/*
  reutrns city name from parsed_object returned by google api
*/
    let x = parsed_object.results[0];
    let y = x.address_components;
    let z = y[3];
    return z.long_name;
}



router.use(
  (req, res, next) => {
    function getCurrentPlaceInfo(areqbody) {
      /*
         this function will return an object containing info of place in which user
         is currently present
      */
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${areqbody.persons_lat},${areqbody.persons_lon}&key=${key}`;
      request (
        url,
        (error, response, body) => {
          let parsed_object = JSON.parse(body);
          let city_name = giveCityNameLW(parsed_object);
          if (city_name == "Bihar") req.city_name = "Patna";
          else req.city_name = city_name;
          console.log("Ok! getcitynameMW");
          next();
        }
      );
    }


    getCurrentPlaceInfo(req.body);
  }
)

module.exports = router;
