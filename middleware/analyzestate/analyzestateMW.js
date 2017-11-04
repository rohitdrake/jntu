const express = require('express');
const router  = express.Router();

const govtData = require('../../data/district_crime_data').data;

// process-stateObj: object -> ???
// function process-stateObj(res.locals.stateObj) {
//     ....(res.locals.stateObj.add1)...
//     ....(res.locals.stateObj.add2)...
//   }

router.use((req, res, next)=>{
  let state_district_array = require('./helperFunc/give_district_array.js')(govtData, res.locals.stateObj.add1);
  if(!(state_district_array)) {
  let x = require('./helperFunc/give_district_array.js')(govtData, res.locals.stateObj.add2);
  res.send(x);
 }
 // console.log(state_district_array);
 res.send(state_district_array);
});

module.exports = router;
