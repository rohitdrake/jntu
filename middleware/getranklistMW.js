const express = require('express');
const router  = express.Router();



let govtData = require('../data/state_population.js');
let myArray=[]; // array which will store data for each state as per my need
let crime_density;
let state_name;
let state_population;
let crime_number;
let state_flag;

govtData.forEach(
  (arrayElement, arrayIndex, Anarray) =>  {
    crime_density = ((Number(arrayElement[3]) / Number(arrayElement[arrayElement.length - 1])) * 100);
    if(crime_density > 0.25) state_flag = "red";
    else state_flag = "green";
    crime_density = String(crime_density);
    crime_density = crime_density.slice(0,5);
    state_name = arrayElement[2];
    state_population = arrayElement[arrayElement.length - 1];
    crime_number = arrayElement[3];
    myArray.push([state_name,crime_number,state_population,crime_density,state_flag]);
  }
);

router.use((req, res, next)=>{
  res.send(myArray);
});

module.exports = router;
