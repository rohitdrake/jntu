const express = require('express');
const app     = express();

// middleware for checking whether req.body is properly filled up or not
let checkreqbodyMW = require('./middleware/middleware_gethelp/checkreqbodyMW');

// middleware for getting address of user using data sent by them
let addressMW = require('./middleware/middleware_gethelp/addressMW');
// middleware for sending address of user to neares police station
let sendsmsMW  = require('./middleware/middleware_gethelp/sendsmsMW');
// middleware for getting reference of nearest police station
let searchpsMW   = require('./middleware/middleware_gethelp/searchpsMW');
// middleware for getting details of nearest police station
let nearestpsdetailMW = require('./middleware/middleware_gethelp/nearestpsdetailMW');
// middlewre for serving map from user to police station
let preparemapMW = require('./middleware/middleware_gethelp/preparemapMW');

// middleware to get the name of city
const getcitynameMW = require('./middleware/middleware_analyze/getcitynameMW');
// middleware to get city report and all city report in two different object
const getcityreportMW = require('./middleware/middleware_analyze/getcityreportMW');
// middleware to render graph for representing crime in current cit
const renderGraphMW  = require('./middleware/middleware_analyze/rendergraphMW');

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.use('/getHelp', express.static(__dirname + "/public1"));

app.use('/analyze', express.static(__dirname + "/public2"));

app.use('/analyze/proceed', [checkreqbodyMW , getcitynameMW, getcityreportMW, renderGraphMW]);

app.use('/getHelp/proceed', [checkreqbodyMW , addressMW , searchpsMW, nearestpsdetailMW, sendsmsMW, preparemapMW]);














const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening  on port ${port}`));
