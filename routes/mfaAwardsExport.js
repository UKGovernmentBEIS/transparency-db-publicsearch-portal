const express = require('express');
const axios = require('axios');
const utils = require('../utils');
const { beisUrlPublicSearch } = require('../config');
const { toMfaAwardExportRow, processExport } = require('../exportUtils');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const format = req.query.format === 'csv' ? 'csv' : 'xlsx';
        var errors = [];

        const filters = utils.getFilters(req, 'mfa');

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
            return res.render('publicusersearch/mfaawards', {
                filters,
                results: [],
                pageCount: 0,
                page: 0,
                size: 10,
                errors,
            });
        }

        const response = await axios.get(
            beisUrlPublicSearch + '/searchResults/mfaawards/export',
            {
                params: filters,
            },
        );

        const awards = Array.isArray(response.data)
            ? response.data
            : response.data.mfaAwards || [];

        const exportRows = awards.map(toMfaAwardExportRow);
        return processExport(
            exportRows,
            format,
            'mfa_speia_awards_export',
            res,
        );
    } catch (error) {
        next(error);
    }
});

module.exports = router;
