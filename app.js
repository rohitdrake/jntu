const express = require('express');
const fs      = require('fs');
const app     = express();

app.use(express.urlencoded({extended: true}));
app.use('/', express.static('./public'));

// middleware for sending nonserious crime data in district
const nonseriouscrimeMW = require(__dirname+'/middleware/nonseriouscrimeMW');
// middleware for getting index of district in crime data
const givedistrictindexMW = require('./middleware/givedistrictindexMW.js');
// middleware for getting district name by sending lat and lon through request object
const getDistrictNameMW = require('./middleware/getdistrictnameMW.js');
// middleware for getting crime against woman in a given district
const womancrimeMW = require('./middleware/womancrimeMW.js');
// middleware for getting crime related to business in a given district
const businessMW = require('./middleware/businessMW.js');
// middleware for getting the name of the current state
const getstatenameMW = require('./middleware/analyzestate/getstatenameMW.js');
// middleware for getting crime data of  all district in state when provided state name in res object
const analyzestateMW = require('./middleware/analyzestate/analyzestateMW.js');
// middleware for getting serious crime data in the current district
// this middleware is used in conjunction with getDistrictNameMW and givedistrictindexMW
const seriouscrimeMW = require('./middleware/seriouscrimeMW');
// middleware for getting serious crime data for a state
const seriouscrimeforstateMW = require('./middleware/seriouscrimeforstateMW.js');

// middleware for getting address of user using data sent by them
let addressMW = require('./middleware/middleware_gethelp/addressMW.js');
// middleware for sending address of user to neares police station
let sendsmsMW  = require('./middleware/middleware_gethelp/sendsmsMW.js');
// middleware for getting reference of nearest police station
let searchpsMW   = require('./middleware/middleware_gethelp/searchpsMW.js');
// middleware for getting details of nearest police station
let nearestpsdetailMW = require('./middleware/middleware_gethelp/nearestpsdetailMW.js');
// middlewre for serving map from user to police station
let preparemapMW = require('./middleware/middleware_gethelp/preparemapMW.js');

app.listen((process.env.PORT || 3000), () => console.log("listening on port 3000!"));


app.use('/panic', [addressMW , searchpsMW, nearestpsdetailMW, sendsmsMW, preparemapMW]);
app.use('/nonseriousCrime', [getDistrictNameMW , givedistrictindexMW,nonseriouscrimeMW ]);
app.use('/womanCrime', [getDistrictNameMW , givedistrictindexMW,womancrimeMW]);
app.use('/businessCrime', [getDistrictNameMW , givedistrictindexMW,businessMW]);
app.use('/analyzeState', [getstatenameMW, analyzestateMW]);
app.use('/seriousCrime', [getDistrictNameMW , givedistrictindexMW,seriouscrimeMW]);
app.use('/seriousCrimeforState', [require("./middleware/districtindexforstateMW"), seriouscrimeforstateMW]);
app.use('/getStateRank', require("./middleware/getranklistMW.js"));
app.use('/terrorStateStatus', [getstatenameMW, require("./middleware/terrordataMW.js")]);
