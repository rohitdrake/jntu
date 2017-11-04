const express = require('express');
const router  = express.Router();

const govtData = require('../data/district_crime_data').data;

router.use((req, res, next)=>{
    let district_name = req.body.lat;

    console.log(req.body);
    let dis_index = require('../helper_functions/give_dis_index.js')(govtData,district_name,null);
    res.locals.dis_state_index = dis_index;
    next();
});

module.exports = router;
