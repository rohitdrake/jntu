const express = require('express');
const router  = express.Router();
const request = require('request');


let city_obj =  {/* this obj will hold crime data */};

let total_city_obj = {/* this obj will hold toal national crime data */};

// getcityarray: array String(city_name) -> array
/*
  function getcityarray(parsed_object ,city_name) {
    ...(parsed_object[i][2])...
}
*/
function getcityarray(parsed_object ,city_name) {
  let i;
  let len = parsed_object.length;
  let city_array;
  for(i = 1; i < len; i++) {
    city_array = parsed_object[i];
    if (city_array[2] == city_name) return city_array;
  }
  return "city not found";
}

router.use(
  (req, res, next) => {
    request(
      'https://data.gov.in/node/1075501/datastore/export/json',
       (error, response, body) => {
         let parsed_object = JSON.parse(body);
         console.log()
         let city_array = getcityarray(parsed_object, req.city_name);
         city_obj.total_crime = city_array[264];
         city_obj.crime_rate  = city_array[266];
         let total_city_array = parsed_object[parsed_object.length - 1];
         total_city_obj.total_crime = total_city_array[264];
         total_city_obj.crime_rate = total_city_array[266];
         req.city_obj = city_obj;
         req.total_city_obj = total_city_obj;
        //  console.log(req.total_city);
        console.log("OK! getcityreportMW");
         next();
       }
    );
  }
)

module.exports = router;
