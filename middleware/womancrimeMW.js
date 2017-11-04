const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data');

const womanCrimeObject =  {
  district_array: govtData.data,/* this array contains crime data about each district */
  crime_name_array: govtData.fields,
  index_array: [0,1,2,7,14,19,59,60,61,62,63,64,65,66,67,68,73,74],
  give_number_of_cime_against_woman:  require('../helper_functions/give_index_array_crimeHF.js')
};



router.use(
  (req, res, next) => {
    let x;
    x = womanCrimeObject.give_number_of_cime_against_woman(womanCrimeObject.crime_name_array, womanCrimeObject.district_array, Number(res.locals.index_object.dis_index), womanCrimeObject.index_array);
    res.send(x);
  }
);

module.exports = router;

/*
"fields": [
{
"id": "a",
"label": "States\/UTs",
"type": "string"
},
{
"id": "b",
"label": "District",
"type": "string"
},
{
"id": "c",
"label": "Year",
"type": "string"
},
{
"id": "d",
"label": "Murder",
"type": "string"
},
{
"id": "e",
"label": "Attempt to commit Murder",
"type": "string"
},
{
"id": "f",
"label": "Culpable Homicide not amounting to Murder",
"type": "string"
},
{
"id": "g",
"label": "Attempt to commit Culpable Homicide",
"type": "string"
},
{
"id": "h",
"label": "Rape", 7
"type": "string"
},
{
"id": "i",
"label": "Custodial Rape",
"type": "string"
},
{
"id": "j",
"label": "Custodial_Gang Rape",
"type": "string"
},
{
"id": "k",
"label": "Custodial_Other Rape",
"type": "string"
},
{
"id": "l",
"label": "Rape other than Custodial",
"type": "string"
},
{
"id": "m",
"label": "Rape_Gang Rape",
"type": "string"
},
{
"id": "n",
"label": "Rape_Others",
"type": "string"
},
{
"id": "o",
"label": "Attempt to commit Rape",14
"type": "string"
},
{
"id": "p",
"label": "Kidnapping & Abduction_Total",
"type": "string"
},
{
"id": "q",
"label": "Kidnapping & Abduction",
"type": "string"
},
{
"id": "r",
"label": "Kidnapping & Abduction in order to Murder",
"type": "string"
},
{
"id": "s",
"label": "Kidnapping for Ransom",
"type": "string"
},
{
"id": "t",
"label": "Kidnapping & Abduction of Women to compel her for marriage",19
"type": "string"
},
{
"id": "u",
"label": "Other Kidnapping",
"type": "string"
},
{
"id": "v",
"label": "Dacoity",
"type": "string"
},
{
"id": "w",
"label": "Dacoity with Murder",
"type": "string"
},
{
"id": "x",
"label": "Other Dacoity",
"type": "string"
},
{
"id": "y",
"label": "Making Preparation and Assembly for committing Dacoity",
"type": "string"
},
{
"id": "z",
"label": "Robbery",
"type": "string"
},
{
"id": "aa",
"label": "Criminal Trespass\/Burglary",
"type": "string"
},
{
"id": "ab",
"label": "Criminal Trespass or Burglary",
"type": "string"
},
{
"id": "ac",
"label": "House Trespass & House Breaking",
"type": "string"
},
{
"id": "ad",
"label": "Theft",
"type": "string"
},
{
"id": "ae",
"label": "Auto Theft",
"type": "string"
},
{
"id": "af",
"label": "Other Thefts",
"type": "string"
},
{
"id": "ag",
"label": "Unlawful Assembly",
"type": "string"
},
{
"id": "ah",
"label": "Riots",
"type": "string"
},
{
"id": "ai",
"label": "Riots_Communal",
"type": "string"
},
{
"id": "aj",
"label": "Riots_Industrial",
"type": "string"
},
{
"id": "ak",
"label": "Riots_Political",
"type": "string"
},
{
"id": "al",
"label": "Riots_Caste Conflict",
"type": "string"
},
{
"id": "am",
"label": "Riots_SC\/STs Vs Non-SCs\/STs",
"type": "string"
},
{
"id": "an",
"label": "Riots_Other Caste Conflict",
"type": "string"
},
{
"id": "ao",
"label": "Riots_Agrarian",
"type": "string"
},
{
"id": "ap",
"label": "Riots_Students",
"type": "string"
},
{
"id": "aq",
"label": "Riots_Sectarian",
"type": "string"
},
{
"id": "ar",
"label": "Riots_Others",
"type": "string"
},
{
"id": "as",
"label": "Criminal Breach of Trust",
"type": "string"
},
{
"id": "at",
"label": "Cheating",
"type": "string"
},
{
"id": "au",
"label": "Forgery",
"type": "string"
},
{
"id": "av",
"label": "Counterfeiting",
"type": "string"
},
{
"id": "aw",
"label": "Counterfeit Offences related to Counterfeit Coin",
"type": "string"
},
{
"id": "ax",
"label": "Counterfeiting Government Stamp",
"type": "string"
},
{
"id": "ay",
"label": "Counterfeit currency & Bank notes",
"type": "string"
},
{
"id": "az",
"label": "Counterfeiting currency notes\/Bank notes",
"type": "string"
},
{
"id": "ba",
"label": "Using forged or counterfeiting currency\/Bank notes",
"type": "string"
},
{
"id": "bb",
"label": "Possession of forged or counterfeiting currency\/Bank notes",
"type": "string"
},
{
"id": "bc",
"label": "Making or Possessing materials for forged currency\/Bank notes",
"type": "string"
},
{
"id": "bd",
"label": "Making or Using documents resembling currency",
"type": "string"
},
{
"id": "be",
"label": "Arson",
"type": "string"
},
{
"id": "bf",
"label": "Grievous Hurt",
"type": "string"
},
{
"id": "bg",
"label": "Hurt",
"type": "string"
},
{
"id": "bh", 59
"label": "Acid attack",
"type": "string"
},
{
"id": "bi", 60
"label": "Attempt to Acid Attack",
"type": "string"
},
{
"id": "bj", 61
"label": "Dowry Deaths",
"type": "string"
},
{
"id": "bk", 62
"label": "Assault on Women with intent to outrage her Modesty",
"type": "string"
},
{
"id": "bl", 63
"label": "Sexual Harassment",
"type": "string"
},
{
"id": "bm", 64
"label": "Assault or use of criminal force to women with intent to Disrobe",
"type": "string"
},
{
"id": "bn", 65
"label": "Voyeurism",
"type": "string"
},
{
"id": "bo", 66
"label": "Stalking",
"type": "string"
},
{
"id": "bp", 67
"label": "Other Assault on Women",
"type": "string"
},
{
"id": "bq", 68
"label": "Insult to the Modesty of Women",
"type": "string"
},
{
"id": "br", 69
"label": "At Office premises",
"type": "string"
},
{
"id": "bs", 70
"label": "Other places related to work",
"type": "string"
},
{
"id": "bt", 71
"label": "In Public Transport system",
"type": "string"
},
{
"id": "bu", 72
"label": "Places other than 231, 232 & 233",
"type": "string"
},
{
"id": "bv", 73
"label": "Cruelty by Husband or his Relatives",
"type": "string"
},
{
"id": "bw", 74
"label": "Importation of Girls from Foreign Country",
"type": "string"
},
{
"id": "bx",
"label": "Causing Death by Negligence",
"type": "string"
},
{
"id": "by",
"label": "Deaths due to negligent driving\/act",
"type": "string"
},
{
"id": "bz",
"label": "Deaths due to Other Causes",
"type": "string"
},
{
"id": "ca",
"label": "Offences against State",
"type": "string"
},
{
"id": "cb",
"label": "Sedition",
"type": "string"
},
{
"id": "cc",
"label": "Other offences against State",
"type": "string"
},
{
"id": "cd",
"label": "Offences promoting enmity between different groups",
"type": "string"
},
{
"id": "ce",
"label": "Promoting enmity between different groups",
"type": "string"
},
{
"id": "cf",
"label": "Imputation, assertions prejudicial to national integration",
"type": "string"
},
{
"id": "cg",
"label": "Extortion",
"type": "string"
},
{
"id": "ch",
"label": "Disclosure of Identity of Victims",
"type": "string"
},
{
"id": "ci",
"label": "Incidence of Rash Driving",
"type": "string"
},
{
"id": "cj",
"label": "HumanTrafficking",
"type": "string"
},
{
"id": "ck",
"label": "Unnatural Offence",
"type": "string"
},
{
"id": "cl",
"label": "Other IPC crimes",
"type": "string"
},
{
"id": "cm",
"label": "Total Cognizable IPC crimes",
"type": "string"
}
*/
