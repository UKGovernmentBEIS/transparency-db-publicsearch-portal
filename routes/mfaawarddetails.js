// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');

router.get('/', async (req, res) => {
    utils.setSecurityHeaders(res);

    const mfaAwardNumber = req.query.id;
    const endpoint =
        beisUrlPublicSearch + '/searchResults/mfa/' + mfaAwardNumber;

    try {
        const response = await axios.get(endpoint);
        const mfaAward = response.data;

        if (
            response.data.status.toLowerCase() === 'rejected' ||
            response.data.status.toLowerCase() === 'awaiting approval'
        ) {
            return res.render('publicusersearch/noresults', {});
        }

        const backUrl = req.session.mfaAwardSearchBackUrl || null;
        const backButton_text = 'Back to MFA award search results';

        return res.render('publicusersearch/mfaawarddetails', {
            mfaAward,
            backUrl,
            backButton_text,
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
