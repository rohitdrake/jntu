const express = require('express');
const router  = express.Router();

// process-coObject: coObject -> ????
// function process-coObject(req.coObject) {
//    ...(req.coObject.ulat)..
//    ...(req.coObject.ulon)...
//    ...(req.coObject.plat)...
//    ...(req.coObject.plon )...
// }

//req.psObject.international_phone_number

router.use(
  (req, res, next) => {
    console.log(req.coObject);
      res.send(
                { user_lat: req.coObject.ulat, user_lon: req.coObject.ulon,
                  ps_lat: String(req.coObject.plat), ps_lon: String(req.coObject.plon),
                  number: req.psObject.international_phone_number
                }
              );
  }
)

module.exports = router;
