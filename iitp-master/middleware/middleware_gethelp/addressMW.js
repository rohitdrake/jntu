const express = require('express');
const router  = express.Router();
const request = require('request');

const apikey  = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";

let SMSobject = {/* This object will store all those information
                    component which will be sent to nearest police station
              */};

router.use(
//lambda: req-obj res-obj next -> req-obj(modified)
//get address of user by accessing data provided by him in req.body
// (req, res, next) => {
//     ...(req.body.persons_lat)...
//     ...(req.body.persons_lon)...
//     ...(req.body.location_accuracy)...
// }
(req, res, next) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.persons_lat},${req.body.persons_lon}&key=${apikey}`;
  SMSobject.persons_latitude = req.body.persons_lat;
  SMSobject.persons_longitude = req.body.persons_lon;
  SMSobject.persons_location_radius = req.body.location_accuracy;
  request(url, (error, response, body)=>{
    let parsed_body = JSON.parse(body);
    SMSobject.persons_formatted_address = parsed_body.results[0].formatted_address;
    if (error) res.send(error);
    req.SMSobject = SMSobject;
    next();
  });

}
);

module.exports = router;
