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
    const defaultReturnUrl = '/awards';
    var returnUrl = req.query.returnUrl || defaultReturnUrl;
    var awardDetailReturnUrl = req.originalUrl;
    const awardnumber = req.query.award || '0';
    var backButton_text = 'Back to search results';

    var awardendpoint =
        beisUrlPublicSearch + '/searchResults/award/' + awardnumber;

    try {
        const awardapidata = await axios.get(awardendpoint);
        var searchawarddetails = awardapidata.data;
        var backButton_href = returnUrl;
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
            returnUrl &&
            returnUrl.includes('/scheme') &&
            typeof searchmeasuredetails !== 'undefined'
        ) {
            backButton_text = 'Back to scheme details';
        }

        if (
            searchawarddetails.subsidyMeasure.status === 'Deleted' ||
            searchawarddetails.status === 'Rejected'
        ) {
            res.render('publicusersearch/noresults', {
                backButton_href,
                awardDetailReturnUrl,
            });
        } else {
            res.render('publicusersearch/searchresultsawarddetail', {
                searchawarddetails,
                backButton_href,
                backButton_text,
                awardDetailReturnUrl,
            });
        }
    } catch (err) {
        if (err.toString().includes('404')) {
            res.render('publicusersearch/noresults', {
                backButton_href,
            });
            console.warn('No results found for award number ' + awardnumber);
        } else {
            console.error(err);
        }
    }
});

module.exports = router;
