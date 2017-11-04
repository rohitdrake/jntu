
// give_index_array_crime: (arrayof Object) (arrayof mixed-data) number (arrayof number) -> object
// adds properties having crime data as value to crime object
// function give_index_array_crime(crime_name_array,data_array, district_index, index_array) {
// ....
//}
   function give_index_array_crime(crime_name_array,district_array, district_index, index_array) {
     let crimeObject = {
       /*this object will store crime data with labels */
     };
     let last_index = (index_array.length - 1);
     let data_array = district_array[district_index];
     // helper_fun: number -> number
     // this function iterates over index_array recursively
     // function helper_fun(anIndex) {....}
     function helper_fun(anIndex) {
       if (anIndex === last_index)
       {
          crimeObject[(crime_name_array[index_array[anIndex]])["label"]] = data_array[index_array[anIndex]];
       }  else {
         crimeObject[(crime_name_array[index_array[anIndex]])["label"]] = (data_array[index_array[anIndex]]);
         helper_fun(++anIndex);
        }
       }
        helper_fun(0);
        return crimeObject
   }

module.exports = give_index_array_crime;
//
// let district_array = require('../data/district_crime_data').data;
// let crime_name_array = require('../data/district_crime_data').fields;
// let index_array= [45, 46 , 47 , 48, 49, 50, 51, 52, 53, 54, 55, 61, 65, 75, 85];
//
// console.log(give_index_array_crime(crime_name_array, district_array, 0, index_array));
