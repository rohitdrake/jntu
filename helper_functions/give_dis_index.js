// give_dis_index: (arrayof array) String String -> number
// returns the index of district in data array
// function give_dis_index(data, dis_name1, dis_name2)  {}
function give_dis_index(data, dis_name1, dis_name2) {
  let len = data.length;
  let i;
  let j;
  let dis_name12 = dis_name1.toLowerCase();
  if (dis_name2) {
  let dis_name22 = dis_name2.toLowerCase();
}
  for(i=0; i<len;i++) {
    if (data[i][1].toLowerCase() === dis_name12) return i;
    else continue;
  }
  for(j=0; j<len;j++) {
    if (data[j][1].toLowerCase() === dis_name22) return i;
    else continue;
  }
  return false;
}

module.exports = give_dis_index;
