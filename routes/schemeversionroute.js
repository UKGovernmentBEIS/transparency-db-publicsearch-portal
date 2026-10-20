// ********************************************************************
// Gov.UK transparency subsidy scheme version detail page
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');

router.get('/', async (req, res) => {
    utils.setSecurityHeaders(res);

    console.log('scNumber: ' + req.query.scNumber);
    console.log('version: ' + req.query.version);
    const scnumber = req.query.scNumber;
    const version = req.query.version;

    const currentURI = req.protocol + '://' + req.get('host') + req.originalUrl;
    const versionEndpoint =
        beisUrlPublicSearch +
        '/schemes/scheme/' +
        scnumber +
        '/version/' +
        version;

    try {
        var response = await axios.get(versionEndpoint);
        const schemeVersionDetails = response.data;
        schemeVersionDetails.spendingSectorArray = [];
        if (schemeVersionDetails.spendingSectors != null) {
            schemeVersionDetails.spendingSectorArray = JSON.parse(
                schemeVersionDetails.spendingSectors,
            );
        }

        schemeVersionDetails.purposeArray = [];
        if (schemeVersionDetails.purpose != null) {
            schemeVersionDetails.purposeArray = JSON.parse(
                schemeVersionDetails.purpose,
            );
        }

        const backUrl = '/scheme/?scheme=' + encodeURIComponent(scnumber);

        res.render('publicusersearch/scheme-version', {
            currentURI,
            schemeVersionDetails,
            backUrl,
            backButton_text: 'Back to scheme details',
        });
    } catch (err) {
        if (err.toString().includes('404')) {
            res.render('publicusersearch/noresults', {});
            console.warn('No results found for scheme number ' + scnumber);
        } else {
            res.render('publicusersearch/404');
            console.error(err);
        }
    }
});

module.exports = router;
