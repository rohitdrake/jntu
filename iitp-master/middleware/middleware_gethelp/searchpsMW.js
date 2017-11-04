const express = require('express');
const router  = express.Router();
const request = require('request');

let psObject = {/* object to store police station related data */};




router.use((req, res, next) => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.persons_lat},${req.body.persons_lon}&rankby=distance&type=police&key=AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50`;
  request(url, (error, response, body) => {
    if(error) res.send("Some error happend");
    let parsed_body = JSON.parse(body);
    let len = parsed_body.results.length;
    psObject.ps_array = parsed_body.results;
    psObject.lat = parsed_body.results[0].geometry.location.lat;
    psObject.lon = parsed_body.results[0].geometry.location.lng;
    req.psObject = psObject;
    next();
  });
});

module.exports = router;
