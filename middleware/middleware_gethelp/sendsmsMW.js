const express = require('express');
const router  = express.Router();
const request = require('request');
const plivo = require('plivo');

let apikey = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";

let coObject = { /* object for storing co-ordinates of users and policStation */ };

var p = plivo.RestAPI({
  authId: 'MANZK1YJIXNZLLMJU1OT',
  authToken: 'NzZjZDJjMjhiM2M4NThhNDI4ZDRjMTlmOWRiYjEw'
});

// process-SMSobject: SMSobject -> ???
// function process-SMSobject(SMSobject) {
//  ...(SMSobject.persons_latitude)...
//  ...(SMSobject.persons_longitude)...
//  ...(SMSobject.persons_location_radius)...
//  ...(SMSobject.persons_formatted_address)...
//}

router.use(
  (req, res, next) => {
    var params = {
        'src':  '+917004324388', // Sender's phone number with country code
        'dst' : `+919931897899`, // Receiver's phone Number with country code
        'text' : `A person in need at ${req.SMSobject.persons_formatted_address} within ${req.SMSobject.persons_location_radius} m radius, ${req.psObject.international_phone_number}.` // Your SMS Text Message - English
    };
    p.send_message(params, function (status, response) {
      console.log(response);
    });
    coObject.ulat = req.SMSobject.persons_latitude;
    coObject.ulon = req.SMSobject.persons_longitude;
    coObject.plat = req.psObject.lat;
    coObject.plon = req.psObject.lon;
    req.coObject  = coObject;
    req.coObject  = coObject;
    console.log(req.coObject);
    next();
  }
);

module.exports = router;
