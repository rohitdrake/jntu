const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data').data;

router.use((req, res, next)=>{
  if(res.locals.address_object) {
    let address_object = res.locals.address_object;
    let dis_index = require('../helper_functions/give_dis_index.js')(govtData,address_object.add1,address_object.add2);
    let index_object = {dis_index: dis_index};
    res.locals.index_object = index_object;
    next();
  } else {
    let district_name = req.body.x;
    let dis_index = require('../helper_functions/give_dis_index.js')(govtData,address_object.add1,null);
    res.locals.dis_state_index = dis_index;
    next();
  }

});

module.exports = router;
