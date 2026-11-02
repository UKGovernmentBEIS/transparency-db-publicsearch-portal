// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');

router.get('/', async (req, res) => {
    utils.setSecurityHeaders(res);
    const filters = utils.getFilters(req, 'award');
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const backendPage = page - 1;

    try {
        const awardsRequest = await axios.get(
            beisUrlPublicSearch + '/searchResults/awards',
            {
                params: {
                    page: backendPage,
                    size,
                    ...filters,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, {
                        arrayFormat: 'repeat',
                        skipNulls: true,
                    }),
            },
        );

        const schemesRequest = await axios.get(
            beisUrlPublicSearch + '/searchResults/schemes',
            {
                params: {
                    page: backendPage,
                    size,
                    ...filters,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, {
                        arrayFormat: 'repeat',
                        skipNulls: true,
                    }),
            },
        );

        const mfaRequest = await axios.get(
            beisUrlPublicSearch + '/searchResults/mfaawards',
            {
                params: {
                    page: backendPage,
                    size,
                    ...filters,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, {
                        arrayFormat: 'repeat',
                        skipNulls: true,
                    }),
            },
        );

        const awardsResults = awardsRequest.data;
        const schemesResults = schemesRequest.data;
        const mfaResults = mfaRequest.data;

        res.render('publicusersearch/search', {
            filters,
            awardsResults,
            schemesResults,
            mfaResults,
        });
    } catch (err) {
        console.log('Error : ' + err);
        res.render('publicusersearch/service-unavailable');
    }
});

module.exports = router;
