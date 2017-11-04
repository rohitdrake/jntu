function statePredic(anObj) {
  let len = anObj.types.length;
  let i;
  for (i=0; i<len;i++)  {
    if('administrative_area_level_1' == anObj.types[i]) return true;
  }
  return false;
}

module.exports = (anArray) =>  {
  console.log(anArray);
  return (anArray.filter(statePredic))[0];
}
