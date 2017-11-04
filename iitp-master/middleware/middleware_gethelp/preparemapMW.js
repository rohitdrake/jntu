const express = require('express');
const router  = express.Router();

// process-coObject: coObject -> ????
// function process-coObject(req.coObject) {
//    ...(req.coObject.ulat)..
//    ...(req.coObject.ulon)...
//    ...(req.coObject.plat)...
//    ...(req.coObject.plon )...
// }

router.use(
  (req, res, next) => {
    console.log(req.coObject);
      res.send(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="css/normalize.css">
            <link rel="stylesheet" href="css/skeleton.css">
            <link rel="stylesheet" href="css/custom.css">
            <style>
              #map {
                height: 300px;
              }
            </style>
          </head>
          <body>
            <div class="row">
              <div id="map"></div>
            </div>
            <h2>Please follow the map along B!</h2>
            <h2>An Alarming message has been sent to the nearest police station at number ${req.psObject.international_phone_number}.You can contanct at this number</h2>
            <h3>NOTE:- For practical reasons, message are being sent to the creater of the app!</h3>
            <a href="/"><button id="manishman"><h3>HOME</h3></button></a>
            <script>
              function initMap() {
                var userObj = {lat: ${req.coObject.ulat}, lng: ${req.coObject.ulon}};
                var psObj = {lat: ${req.coObject.plat}, lng: ${req.coObject.plon}};

                var map = new google.maps.Map(document.getElementById('map'), {
                  center: userObj,
                  zoom: 7
                });

                var directionsDisplay = new google.maps.DirectionsRenderer({
                  map: map
                });

                // Set destination, origin and travel mode.
                var request = {
                  destination: psObj,
                  origin: userObj,
                  travelMode: 'DRIVING'
                };

                // Pass the directions request to the directions service.
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request, function(response, status) {
                  if (status == 'OK') {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);
                  }
                });
              }

            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50&callback=initMap"
                async defer></script>
          </body>
        </html>
        `
      );
  }
)

module.exports = router;
