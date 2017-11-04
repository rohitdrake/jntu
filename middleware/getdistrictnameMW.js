const express = require('express');
const router  = express.Router();
const request = require('request');

const apikey  = "AIzaSyBdnIeUTSuNZWNG6o_GUq-SLDjTs02Og50";


router.use((req, res, next)=>{
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lon}&key=${apikey}`;
  request(
    url,
    (error, response, body) =>  {
      console.log(body);
      console.log(response);
      if(response.statusCode == 200)  {
      let parsedBody = JSON.parse(body); // body given by the google server, sample is at bottom
      if(parsedBody.status === "OK" || parsedBody.status === "ok")  {
        let administrative_array; // to store an object whose types property value is an array containing administrative_area_level_2
        administrative_array = require('../helper_functions/give_administrative_array')(parsedBody.results);
        let address_object = {
          add1: administrative_array.address_components[0].long_name,
          add2: administrative_array.address_components[0].short_name
        };
        res.locals.address_object = address_object;
        next();
      } else {
        res.send("undable to retrive district data from google api!");
      }
    }else{
        res.send("unable to get the name of your current district");
    }
    }//end of callback function in request
  );
});

module.exports = router;


// actual body type retrived by the request
/*
{
  "results": [
    {
      "address_components": [
        {
          "long_name": "Saharsa Station Overbridge",
          "short_name": "Saharsa Station Overbridge",
          "types": [
            "route"
          ]
        },
        {
          "long_name": "Jay Prabha Nagar",
          "short_name": "Jay Prabha Nagar",
          "types": [
            "political",
            "sublocality",
            "sublocality_level_1"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        },
        {
          "long_name": "852201",
          "short_name": "852201",
          "types": [
            "postal_code"
          ]
        }
      ],
      "formatted_address": "Saharsa Station Overbridge, Jay Prabha Nagar, Saharsa, Bihar 852201, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 25.8749606,
            "lng": 86.59434019999999
          },
          "southwest": {
            "lat": 25.8747893,
            "lng": 86.59433749999999
          }
        },
        "location": {
          "lat": 25.874875,
          "lng": 86.59433890000001
        },
        "location_type": "GEOMETRIC_CENTER",
        "viewport": {
          "northeast": {
            "lat": 25.8762239302915,
            "lng": 86.5956878302915
          },
          "southwest": {
            "lat": 25.8735259697085,
            "lng": 86.59298986970849
          }
        }
      },
      "place_id": "ChIJ8TBVH5E97jkR8wAg4gR1MvA",
      "types": [
        "route"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "Krishna Nagar",
          "short_name": "Krishna Nagar",
          "types": [
            "political",
            "sublocality",
            "sublocality_level_1"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "Krishna Nagar, Saharsa, Bihar, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 25.8774344,
            "lng": 86.594876
          },
          "southwest": {
            "lat": 25.8589671,
            "lng": 86.58354039999999
          }
        },
        "location": {
          "lat": 25.8640916,
          "lng": 86.5917982
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 25.8774344,
            "lng": 86.594876
          },
          "southwest": {
            "lat": 25.8589671,
            "lng": 86.58354039999999
          }
        }
      },
      "place_id": "ChIJESJFto897jkR8m-3hOzqlBI",
      "types": [
        "political",
        "sublocality",
        "sublocality_level_1"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "Saharsa, Bihar, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 25.9247019,
            "lng": 86.65861129999999
          },
          "southwest": {
            "lat": 25.8351234,
            "lng": 86.53827659999999
          }
        },
        "location": {
          "lat": 25.8834961,
          "lng": 86.6006249
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 25.9247019,
            "lng": 86.65861129999999
          },
          "southwest": {
            "lat": 25.8351234,
            "lng": 86.53827659999999
          }
        }
      },
      "place_id": "ChIJz417rpU97jkR5Yb-IfXQvJA",
      "types": [
        "locality",
        "political"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "852201",
          "short_name": "852201",
          "types": [
            "postal_code"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "Saharsa, Bihar 852201, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 25.9155046,
            "lng": 86.6436021
          },
          "southwest": {
            "lat": 25.8706643,
            "lng": 86.5872638
          }
        },
        "location": {
          "lat": 25.8897553,
          "lng": 86.6157527
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 25.9155046,
            "lng": 86.6436021
          },
          "southwest": {
            "lat": 25.8706643,
            "lng": 86.5872638
          }
        }
      },
      "place_id": "ChIJl2aED8097jkRoGie3jrI_Wo",
      "types": [
        "postal_code"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "Saharsa",
          "short_name": "Saharsa",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "Saharsa, Bihar, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 26.0728702,
            "lng": 86.874489
          },
          "southwest": {
            "lat": 25.5939921,
            "lng": 86.31698609999999
          }
        },
        "location": {
          "lat": 25.860336,
          "lng": 86.6207943
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 26.0728702,
            "lng": 86.874489
          },
          "southwest": {
            "lat": 25.5939921,
            "lng": 86.31698609999999
          }
        }
      },
      "place_id": "ChIJz9uMt5s97jkRWKpMYNuptBA",
      "types": [
        "administrative_area_level_2",
        "political"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "Bihar",
          "short_name": "BR",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "Bihar, India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 27.5213199,
            "lng": 88.28975199999999
          },
          "southwest": {
            "lat": 24.286278,
            "lng": 83.31486509999999
          }
        },
        "location": {
          "lat": 25.0960742,
          "lng": 85.31311939999999
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 27.5213199,
            "lng": 88.28975199999999
          },
          "southwest": {
            "lat": 24.286278,
            "lng": 83.31486509999999
          }
        }
      },
      "place_id": "ChIJA2m78ERY7TkRJeO6G-0_rVc",
      "types": [
        "administrative_area_level_1",
        "political"
      ]
    },
    {
      "address_components": [
        {
          "long_name": "India",
          "short_name": "IN",
          "types": [
            "country",
            "political"
          ]
        }
      ],
      "formatted_address": "India",
      "geometry": {
        "bounds": {
          "northeast": {
            "lat": 35.5087008,
            "lng": 97.39535869999999
          },
          "southwest": {
            "lat": 6.4626999,
            "lng": 68.1097
          }
        },
        "location": {
          "lat": 20.593684,
          "lng": 78.96288
        },
        "location_type": "APPROXIMATE",
        "viewport": {
          "northeast": {
            "lat": 35.5087008,
            "lng": 97.39535869999999
          },
          "southwest": {
            "lat": 6.4626999,
            "lng": 68.1097
          }
        }
      },
      "place_id": "ChIJkbeSa_BfYzARphNChaFPjNc",
      "types": [
        "country",
        "political"
      ]
    }
  ],
  "status": "OK"
}
*/
