const express = require('express');
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');
const { toAwardExportRow, processExport } = require('../exportUtils');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const format = req.query.format === 'csv' ? 'csv' : 'xlsx';
        var errors = [];
        var paList = [];

        const filters = utils.getFilters(req, 'award');

        const confirmationDateFrom = utils.buildDateFromStrings(
            filters.confirmationFromDay,
            filters.confirmationFromMonth,
            filters.confirmationFromYear,
        );
        const confirmationDateTo = utils.buildDateFromStrings(
            filters.confirmationToDay,
            filters.confirmationToMonth,
            filters.confirmationToYear,
        );

        // Validate award full amount from and to
        var awardAmountErrors = utils.validateFromTo(
            filters.awardFullFromAmount,
            filters.awardFullToAmount,
        );

        if (awardAmountErrors.hasErrors) {
            const fieldIds = {
                from: 'awardFull-from-amount-input',
                to: 'awardFull-to-amount-input',
            };

            awardAmountErrors.field =
                fieldIds[awardAmountErrors.field] ?? fieldIds.to;
            errors.push(awardAmountErrors);
        }

        // Validate confirmation date from and to
        var confirmationDateErrors = utils.validateDateFromTo(
            confirmationDateFrom,
            confirmationDateTo,
        );

        if (confirmationDateErrors.hasErrors) {
            const fieldIds = {
                from: 'confirmation-filter-from-day',
                to: 'confirmation-filter-to-day',
            };

            confirmationDateErrors.field =
                fieldIds[confirmationDateErrors.field] ?? fieldIds.to;
            errors.push(confirmationDateErrors);
        }

        if (errors.length > 0) {
            try {
                const paListRequest = await axios.get(
                    beisUrlPublicSearch + '/schemes/all_gas',
                    {
                        headers: {
                            'X-Frame-Options': 'DENY',
                            'Content-Security-Policy': "frame-ancestors 'self'",
                        },
                    },
                );

                paList = paListRequest.data.gaList;
                paList.sort((a, b) =>
                    a.grantingAuthorityName.localeCompare(
                        b.grantingAuthorityName,
                    ),
                );
            } catch (err) {
                console.log(
                    'Error getting list of public authorities : ' + err,
                );
            }

            return res.render('publicusersearch/awards', {
                filters,
                results: [],
                pageCount: 0,
                page: 0,
                size: 10,
                errors,
                paList,
            });
        }
        const response = await axios.get(
            beisUrlPublicSearch + '/searchResults/awards/export',
            {
                params: filters,
            },
        );

        const awards = Array.isArray(response.data)
            ? response.data
            : response.data.awards || [];

        const exportRows = awards.map(toAwardExportRow);
        return processExport(exportRows, format, 'subsidy_awards_export', res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
