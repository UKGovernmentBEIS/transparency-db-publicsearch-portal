// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config'); // routes/*.js

router.get('/', async (req, res) => {
    utils.setSecurityHeaders(res);
    const awardnumber = req.query.award || '0';
    var backButton_text = 'Back to search results';

    var awardendpoint =
        beisUrlPublicSearch + '/searchResults/award/' + awardnumber;

    try {
        const awardapidata = await axios.get(awardendpoint);
        var searchawarddetails = awardapidata.data;
        if (searchawarddetails.subsidyObjective != null) {
            searchawarddetails.objectiveArray = JSON.parse(
                searchawarddetails.subsidyObjective,
            );
        }

        searchawarddetails.spendingRegionArray = [];

        if (searchawarddetails.spendingRegion) {
            searchawarddetails.spendingRegionArray = JSON.parse(
                searchawarddetails.spendingRegion,
            );
        }

        if (
            searchawarddetails.subsidyMeasure.status === 'Deleted' ||
            searchawarddetails.status === 'Rejected'
        ) {
            res.render('publicusersearch/noresults', {});
        } else {
            res.render('publicusersearch/searchresultsawarddetail', {
                searchawarddetails,
                backButton_text,
            });
        }
    } catch (err) {
        if (err.toString().includes('404')) {
            res.render('publicusersearch/noresults', {});
            console.warn('No results found for award number ' + awardnumber);
        } else {
            console.error(err);
        }
    }
});

module.exports = router;
