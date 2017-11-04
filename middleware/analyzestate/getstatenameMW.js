const express = require('express');
const router  = express.Router();
const request = require('request');

const apikey  = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";


router.use((req, res, next)=>{
  console.log(typeof req.body.lat);
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lon}&key=AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50`;
  console.log(req.body.lat);
  console.log(req.body.lon);
  console.log(url);
  console.log("OK!");
  request(
    url,
    (error, response, body) =>  {
      let parsedBody = JSON.parse(body);
      if(parsedBody.status === "OK" || parsedBody.status === "ok")  {
        let administrative_array = require('../../helper_functions/give_administrative_array')(parsedBody.results);
        let stateObj = require('./helperFunc/give_admin_lev_1')(administrative_array.address_components);
        if(!stateObj) res.send("Unable to retrive your state name!");
        let address_name_object = {
          add1: stateObj.long_name,
          add2: stateObj.short_name
        };
        // console.log(stateObj);
        res.locals.stateObj = address_name_object;
        next();
        // next();
      } else {
        res.send("undable to retrive district data from google api!");
      }
    }
  );
});

module.exports = router;
