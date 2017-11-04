const express = require('express');
const router  = express.Router();
const request = require('request');

let psObject = {/* object to store police station related data */};




router.use((req, res, next) => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat},${req.body.lon}&rankby=distance&type=police&key=AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50`;
  console.log(url);
  request(url, (error, response, body) => {
    if(error) res.send("Some error happend");
    let parsed_body = JSON.parse(body);
    console.log(parsed_body);
    let len = parsed_body.results.length;
    psObject.ps_array = parsed_body.results;
    psObject.lat = parsed_body.results[0].geometry.location.lat;
    psObject.lon = parsed_body.results[0].geometry.location.lng;
    req.psObject = psObject;
    next();
  });
});

module.exports = router;
