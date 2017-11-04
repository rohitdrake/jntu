const express = require('express');
const router  = express.Router();

router.use(
  //lambda: req-obj res-obj next -> unmodified
  //checks whether req.body has every thing filled up or not
  // (req, res, next) => {
  //     ...(req.body.persons_lat)...
  //     ...(req.body.persons_lon)...
  //     ...(req.body.location_accuracy)...
  // }
  (req, res, next) => {
    if (req.body.persons_lat && req.body.persons_lon && req.body.location_accuracy) next();
    else res.redirect('/');
  }
);

module.exports = router;
