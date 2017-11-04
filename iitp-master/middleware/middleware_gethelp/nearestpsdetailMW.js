const express = require('express');
const router  = express.Router();
const request = require('request');

const apikey  = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";



  router.use(
    (req, res, next) => {
      function get_ps_number(psArray) {
        let len = psArray.length;
        var i;
        for(i = 0; i < len; i++) {
          let url = `https://maps.googleapis.com/maps/api/place/details/json?reference=${psArray[i].reference}&key=${apikey}`;
          request(url, (error, response, body) => {
            if (error) res.send("Something bad happend!");
            let parsed_body = JSON.parse(body);
            if(parsed_body.result.international_phone_number) {
              req.psObject.international_phone_number = parsed_body.result.international_phone_number;
              next();
              return;
            } else if(i === (len - 1)) {
              req.psObject.international_phone_number = parsed_body.result.international_phone_number;
              next();
            }
          });
        }
      }
      console.log("OK!");
      get_ps_number(req.psObject.ps_array);
    }
  );

// router.use(
//   (req, res, next) => {
//     let url = `https://maps.googleapis.com/maps/api/place/details/json?reference=${req.psObject.reference}&key=${apikey}`;
//     request(url, (error, response, body) => {
//       if (error) res.send("Something bad happend!");
//       let parsed_body = JSON.parse(body);
//       console.log(parsed_body);
//       req.psObject.international_phone_number = parsed_body.result.international_phone_number;
//       next();
//     });
//   }
// )

module.exports = router;
