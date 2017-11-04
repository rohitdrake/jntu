const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data');

const crimeObject = {
  district_array: govtData.data,/* this array contains crime data about each district */
  crime_name_array: govtData.fields,
  index_array: [0,1,2,18,21,24,25,26,27,28,29,30,31,32,33,56,84,90],
  give_number_of_serious_crime:  require('../helper_functions/give_index_array_crimeHF.js')
};

router.use((req, res, next)=>{
  let x = crimeObject.give_number_of_serious_crime(crimeObject.crime_name_array,crimeObject.district_array,Number(res.locals.index_object.dis_index),crimeObject.index_array);
  res.send(x);
})

module.exports = router;

/*
"fields": [
{
"id": "a",0
"label": "States\/UTs",
"type": "string"
},
{
"id": "b",1
"label": "District",
"type": "string"
},
{
"id": "c",2
"label": "Year",
"type": "string"
},
{
"id": "d",3
"label": "Murder",
"type": "string"
},
{
"id": "e",4
"label": "Attempt to commit Murder",
"type": "string"
},
{
"id": "f",5
"label": "Culpable Homicide not amounting to Murder",
"type": "string"
},
{
"id": "g",6
"label": "Attempt to commit Culpable Homicide",
"type": "string"
},
{
"id": "h",7
"label": "Rape",
"type": "string"
},
{
"id": "i",8
"label": "Custodial Rape",
"type": "string"
},
{
"id": "j",9
"label": "Custodial_Gang Rape",
"type": "string"
},
{
"id": "k",10
"label": "Custodial_Other Rape",
"type": "string"
},
{
"id": "l",11
"label": "Rape other than Custodial",
"type": "string"
},
{
"id": "m",12
"label": "Rape_Gang Rape",
"type": "string"
},
{
"id": "n",13
"label": "Rape_Others",
"type": "string"
},
{
"id": "o",14
"label": "Attempt to commit Rape",
"type": "string"
},
{
"id": "p",15
"label": "Kidnapping & Abduction_Total",
"type": "string"
},
{
"id": "q",16
"label": "Kidnapping & Abduction",
"type": "string"
},
{
"id": "r",17
"label": "Kidnapping & Abduction in order to Murder",
"type": "string"
},
{
"id": "s",18
"label": "Kidnapping for Ransom",
"type": "string"
},
{
"id": "t",19
"label": "Kidnapping & Abduction of Women to compel her for marriage",
"type": "string"
},
{
"id": "u",20
"label": "Other Kidnapping",
"type": "string"
},
{
"id": "v",21
"label": "Dacoity",
"type": "string"
},
{
"id": "w",22
"label": "Dacoity with Murder",
"type": "string"
},
{
"id": "x",23
"label": "Other Dacoity",
"type": "string"
},
{
"id": "y",24
"label": "Making Preparation and Assembly for committing Dacoity",
"type": "string"
},
{
"id": "z",25
"label": "Robbery",
"type": "string"
},
{
"id": "aa",26
"label": "Criminal Trespass\/Burglary",
"type": "string"
},
{
"id": "ab",27
"label": "Criminal Trespass or Burglary",
"type": "string"
},
{
"id": "ac",28
"label": "House Trespass & House Breaking",
"type": "string"
},
{
"id": "ad",29
"label": "Theft",
"type": "string"
},
{
"id": "ae",30
"label": "Auto Theft",
"type": "string"
},
{
"id": "af",31
"label": "Other Thefts",
"type": "string"
},
{
"id": "ag",32
"label": "Unlawful Assembly",
"type": "string"
},
{
"id": "ah",33
"label": "Riots",
"type": "string"
},
{
"id": "ai",34
"label": "Riots_Communal",
"type": "string"
},
{
"id": "aj",35
"label": "Riots_Industrial",
"type": "string"
},
{
"id": "ak",36
"label": "Riots_Political",
"type": "string"
},
{
"id": "al",37
"label": "Riots_Caste Conflict",
"type": "string"
},
{
"id": "am",38
"label": "Riots_SC\/STs Vs Non-SCs\/STs",
"type": "string"
},
{
"id": "an",39
"label": "Riots_Other Caste Conflict",
"type": "string"
},
{
"id": "ao",40
"label": "Riots_Agrarian",
"type": "string"
},
{
"id": "ap",41
"label": "Riots_Students",
"type": "string"
},
{
"id": "aq",42
"label": "Riots_Sectarian",
"type": "string"
},
{
"id": "ar",43
"label": "Riots_Others",
"type": "string"
},
{
"id": "as",44
"label": "Criminal Breach of Trust",
"type": "string"
},
{
"id": "at",45
"label": "Cheating",
"type": "string"
},
{
"id": "au",46
"label": "Forgery",
"type": "string"
},
{
"id": "av",47
"label": "Counterfeiting",
"type": "string"
},
{
"id": "aw",48
"label": "Counterfeit Offences related to Counterfeit Coin",
"type": "string"
},
{
"id": "ax",49
"label": "Counterfeiting Government Stamp",
"type": "string"
},
{
"id": "ay",50
"label": "Counterfeit currency & Bank notes",
"type": "string"
},
{
"id": "az",51
"label": "Counterfeiting currency notes\/Bank notes",
"type": "string"
},
{
"id": "ba",52
"label": "Using forged or counterfeiting currency\/Bank notes",
"type": "string"
},
{
"id": "bb",53
"label": "Possession of forged or counterfeiting currency\/Bank notes",
"type": "string"
},
{
"id": "bc",54
"label": "Making or Possessing materials for forged currency\/Bank notes",
"type": "string"
},
{
"id": "bd",55
"label": "Making or Using documents resembling currency",
"type": "string"
},
{
"id": "be",56
"label": "Arson",
"type": "string"
},
{
"id": "bf",57
"label": "Grievous Hurt",
"type": "string"
},
{
"id": "bg",58
"label": "Hurt",
"type": "string"
},
{
"id": "bh",59
"label": "Acid attack",
"type": "string"
},
{
"id": "bi",60
"label": "Attempt to Acid Attack",
"type": "string"
},
{
"id": "bj",61
"label": "Dowry Deaths",
"type": "string"
},
{
"id": "bk",62
"label": "Assault on Women with intent to outrage her Modesty",
"type": "string"
},
{
"id": "bl",63
"label": "Sexual Harassment",
"type": "string"
},
{
"id": "bm",64
"label": "Assault or use of criminal force to women with intent to Disrobe",
"type": "string"
},
{
"id": "bn",65
"label": "Voyeurism",
"type": "string"
},
{
"id": "bo",66
"label": "Stalking",
"type": "string"
},
{
"id": "bp",67
"label": "Other Assault on Women",
"type": "string"
},
{
"id": "bq",68
"label": "Insult to the Modesty of Women",
"type": "string"
},
{
"id": "br",69
"label": "At Office premises",
"type": "string"
},
{
"id": "bs",70
"label": "Other places related to work",
"type": "string"
},
{
"id": "bt",71
"label": "In Public Transport system",
"type": "string"
},
{
"id": "bu",72
"label": "Places other than 231, 232 & 233",
"type": "string"
},
{
"id": "bv",73
"label": "Cruelty by Husband or his Relatives",
"type": "string"
},
{
"id": "bw",74
"label": "Importation of Girls from Foreign Country",
"type": "string"
},
{
"id": "bx",75
"label": "Causing Death by Negligence",
"type": "string"
},
{
"id": "by",76
"label": "Deaths due to negligent driving\/act",
"type": "string"
},
{
"id": "bz",77
"label": "Deaths due to Other Causes",
"type": "string"
},
{
"id": "ca",78
"label": "Offences against State",
"type": "string"
},
{
"id": "cb",79
"label": "Sedition",
"type": "string"
},
{
"id": "cc",80
"label": "Other offences against State",
"type": "string"
},
{
"id": "cd",81
"label": "Offences promoting enmity between different groups",
"type": "string"
},
{
"id": "ce",82
"label": "Promoting enmity between different groups",
"type": "string"
},
{
"id": "cf",83
"label": "Imputation, assertions prejudicial to national integration",
"type": "string"
},
{
"id": "cg",84
"label": "Extortion",
"type": "string"
},
{
"id": "ch",85
"label": "Disclosure of Identity of Victims",
"type": "string"
},
{
"id": "ci",86
"label": "Incidence of Rash Driving",
"type": "string"
},
{
"id": "cj",87
"label": "HumanTrafficking",
"type": "string"
},
{
"id": "ck",88
"label": "Unnatural Offence",
"type": "string"
},
{
"id": "cl",89
"label": "Other IPC crimes",
"type": "string"
},
{
"id": "cm",90
"label": "Total Cognizable IPC crimes",
"type": "string"
}
*/
