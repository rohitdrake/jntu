const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data');

const crimeObject = {
  district_array: govtData.data,/* this array contains crime data about each district */
  crime_name_array: govtData.fields,
  index_array: [0,1,2,45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 61, 65, 73, 75, 85, 90],
  give_number_of_serious_cime:  require('../helper_functions/give_index_array_crimeHF.js')
};

router.use(
  (req, res, next)  => {
    let x = crimeObject.give_number_of_serious_cime(crimeObject.crime_name_array, crimeObject.district_array, Number(res.locals.index_object.dis_index), crimeObject.index_array);
    res.send(x);
  }
);

module.exports = router;
