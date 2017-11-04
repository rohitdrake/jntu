const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data'); // data in native form retrived from data.gov.in

const crime_field_array = govtData.fields;
const crime_data_array  = govtData.data;

let crime_index = [0,1,3,4,5,6,7,15,21,22,23,24,25,34,87,90];
let give_serious_cime = require('../helper_functions/give_index_array_crimeHF');


router.use((req, res, next)=>{
  let dis_index = res.locals.dis_state_index;
  current_district_data = give_serious_cime(crime_field_array, crime_data_array, dis_index, crime_index);
  console.log(current_district_data);
  res.send(current_district_data);
});

module.exports = router;

//res.locals.index_object
//{dis_index: dis_index}
