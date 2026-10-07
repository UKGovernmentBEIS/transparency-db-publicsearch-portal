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
    const defaultReturnUrl = '/schemes';
    var returnUrl = req.query.returnUrl || defaultReturnUrl;
    var schemeDetailReturnUrl = req.originalUrl;

    console.log('req.query.scnumber: ' + req.query.scheme);
    const scheme = req.query.scheme;
    console.log('scnumber : ' + scheme);
    var measureendpoint =
        beisUrlPublicSearch + '/schemes/scheme/withawards/' + scheme;

    const backButton_href = returnUrl;
    var page = 1;
    const filters = {
        scheme: scheme,
    };
    const anchor = 'searchresult-table';
    if (Object.prototype.hasOwnProperty.call(req.query, 'page')) {
        var pageParse = parseInt(req.query.page);
        if (!isNaN(pageParse)) {
            page = Math.max(1, pageParse);
        }
    }
    var size = 10;
    if (Object.prototype.hasOwnProperty.call(req.query, 'size')) {
        var perPageParse = parseInt(req.query.size);
        if (!isNaN(perPageParse)) {
            size = perPageParse;
        }
    }
    try {
        const awardRequest = {
            scNumber: scheme,
            pageNumber: page,
            totalRecordsPerPage: size,
            sortBy: ['awardNumber,desc'],
        };
        await axios.post(measureendpoint, awardRequest).then((response) => {
            console.log(`Status: ${response.status}`);
            const searchmeasuredetails = response.data;
            const schemeVersions = searchmeasuredetails.schemeVersions;

            var totalSearchResults = 0;
            var hasAwards = false;
            var startRecord = 0;
            var endRecord = 0;
            var results = [];
            if (typeof response.data.awardSearchResults != 'undefined') {
                totalSearchResults =
                    response.data.awardSearchResults.totalSearchResults;
            }

            let pageCount = 0;
            if (totalSearchResults > 0) {
                pageCount = response.data.awardSearchResults.totalPages;
                hasAwards = true;
                console.log(`Scheme has awards: ${hasAwards}`);
                console.log(
                    `Number of schemes under this scheme: ${totalSearchResults}`,
                );
                startRecord = (page - 1) * size + 1;
                endRecord = Math.min(page * size, totalSearchResults);

                results = response.data.awardSearchResults.awards;
                results.totalSearchResults = totalSearchResults;
            }

            var spendingSectorArray = [];
            if (typeof searchmeasuredetails.spendingSectors !== 'undefined') {
                spendingSectorArray = JSON.parse(
                    searchmeasuredetails.spendingSectors,
                );
            }

            var purposeArray = [];
            if (typeof searchmeasuredetails.purpose !== 'undefined') {
                purposeArray = JSON.parse(searchmeasuredetails.purpose);
            }

            if (response.data.status == 'Deleted') {
                res.render('publicusersearch/noresults', {
                    backButton_href,
                });
            } else {
                res.render('publicusersearch/schemedetails', {
                    currentURI:
                        req.protocol +
                        '://' +
                        req.get('host') +
                        req.originalUrl,
                    spendingSectorArray,
                    searchmeasuredetails,
                    schemeVersions,
                    hasAwards,
                    startRecord,
                    endRecord,
                    results,
                    purposeArray,
                    schemeDetailReturnUrl,
                    returnUrl,
                    backButton_href,
                    anchor,
                    filters,
                    page,
                    size,
                    pageCount,
                });
            }
        });
    } catch (err) {
        if (err.toString().includes('404')) {
            res.render('publicusersearch/noresults', {
                backButton_href: returnUrl,
            });
            console.warn('No results found for scheme number ' + scheme);
        } else {
            console.error(err);
        }
    }
});

module.exports = router;
