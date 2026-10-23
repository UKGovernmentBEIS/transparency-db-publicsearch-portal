const express = require('express');
const router = express.Router();
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');

router.get('/', async (req, res) => {
    utils.setSecurityHeaders(res);

    const awardnumber = req.query.award || '0';

    const awardendpoint =
        beisUrlPublicSearch + '/searchResults/award/' + awardnumber;

    try {
        const awardapidata = await axios.get(awardendpoint);
        const searchawarddetails = awardapidata.data;

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
            return res.render('publicusersearch/noresults', {});
        }

        let backUrl = null;
        let backButton_text = 'Back';

        if (req.query.fromParent === 'scheme' && req.query.scheme) {
            backUrl =
                '/scheme/?scheme=' +
                encodeURIComponent(req.query.scheme) +
                '&fromParent=award&parentId=' +
                encodeURIComponent(awardnumber) +
                '&origin=' +
                encodeURIComponent(req.query.origin || 'schemeSearch');

            backButton_text = 'Back to scheme details';
        } else if (
            req.query.origin === 'awardSearch' &&
            req.session.awardSearchBackUrl
        ) {
            backUrl = req.session.awardSearchBackUrl;
            backButton_text = 'Back to award search results';
        } else if (req.session.awardSearchBackUrl) {
            backUrl = req.session.awardSearchBackUrl;
            backButton_text = 'Back to award search results';
        }

        return res.render('publicusersearch/searchresultsawarddetail', {
            searchawarddetails,
            backButton_text,
            backUrl,
            origin: req.query.origin || 'awardSearch',
        });
    } catch (err) {
        if (err.toString().includes('404')) {
            return res.render('publicusersearch/noresults', {});
        }

        console.error(err);
        return res.render('publicusersearch/service-unavailable');
    }
});

module.exports = router;
