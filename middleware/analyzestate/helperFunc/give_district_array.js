let state_dis_array = [/*this array will hold the name of district and total crime in the district*/];

// give_district_array: (arrayof array) string -> (arrayof array)
// returns all those district data in array whose state is aState
function give_district_array(anArray, aState)  {
  let district_array = anArray.filter(
    (dis_array) =>  {
      if (dis_array[0]==aState) return true
      else return false;
    }
  );

   let i;
   let len = district_array.length;
   for(i=0; i<len; i++) {
     state_dis_array[i] = {name: district_array[i][1], state_name: district_array[i][0], total: district_array[i][90], index_in_data:i};
   }
   return state_dis_array;
}

module.exports = give_district_array;
