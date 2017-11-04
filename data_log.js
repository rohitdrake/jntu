/*
  this file was written to retrive necessary data from https://data.gov.in, and to store it
  instead of fetching them from api 
*/


const request = require('request');
const fs      = require('fs');
const url     = 'https://data.gov.in/node/681341/datastore/export/json';



request(url).pipe(fs.createWriteStream(__dirname + '/data/district_crime_data.json'));
