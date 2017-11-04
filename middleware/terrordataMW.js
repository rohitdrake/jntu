const express = require('express');
const router  = express.Router();

let govtData = require("../data/district_crime_data").data;

let state_array = [/* array for holding state terror crime data */];
// sample element of array
// ["Saran", 190]

let terror_index =  [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];

function pushTerrorData(anArray)  {
  let name = anArray[1];
  if (name == "Economic Offences Unit") return;
  if (name == "Anti Terrorist Squad") return
  let temp_array = [];
  let crime_sum = 0;
  let len = terror_index.length;
  let i;
  for (i=0; i<len; i++) {
    crime_sum = crime_sum + Number(anArray[terror_index[i]]);
  }
  temp_array.push(name);
  temp_array.push(crime_sum);
  state_array.push(temp_array);
}

router.use((req, res, next)=> {
    let stateName = res.locals.stateObj.add1;
    govtData.forEach(
      (element, indexOfElement, ourArray) => {
        if(stateName == element[0]) {
          pushTerrorData(element);
        }
      }
    );
    state_array.sort(
      (a, b)  => {
        return(b[1] - a[1]);
      }
    );
    state_array.shift();
    res.send(state_array);
});

module.exports = router;
