const express = require('express');
const axios = require('axios');
const utils = require("../utils");
const { beisUrlPublicSearch } = require("../config");
const { toSchemeExportRow, processExport } = require("../exportUtils");
const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const format = req.query.format === 'csv' ? 'csv' : 'xlsx';

    const filters = utils.getFilters(req,"scheme");

    var errors = [];
    var paList = [];

    const schemeStartDateFrom = utils.buildDateFromStrings(filters.schemeStartFromDay, filters.schemeStartFromMonth, filters.schemeStartFromYear);
    const schemeStartDateTo = utils.buildDateFromStrings(filters.schemeStartToDay, filters.schemeStartToMonth, filters.schemeStartToYear);

    // Validate scheme start date from and to
    var schemeStartDateErrors = utils.validateDateFromTo(schemeStartDateFrom, schemeStartDateTo)
    
    if (schemeStartDateErrors.hasErrors){
      const fieldIds = {
        from: "schemeStart-filter-from-day",
        to: "schemeStart-filter-to-day",
      };

      schemeStartDateErrors.field = fieldIds[schemeStartDateErrors.field] ?? fieldIds.to;
      errors.push(schemeStartDateErrors);
    }

     // Validate award full amount from and to
     var awardAmountErrors = utils.validateFromTo(filters.schemeBudgetFromAmount, filters.schemeBudgetToAmount);

     if (awardAmountErrors.hasErrors) {
       const fieldIds = {
         from: "schemeBudget-from-amount-input",
         to: "schemeBudget-to-amount-input"
       };
     
       awardAmountErrors.field = fieldIds[awardAmountErrors.field] ?? fieldIds.to;
       errors.push(awardAmountErrors);
     }

    if(errors.length > 0){
      try{
        const paListRequest = await axios.get(
          beisUrlPublicSearch + "/searchResults/all_gas",
          {
            headers: {
              "X-Frame-Options": "DENY",
              "Content-Security-Policy": "frame-ancestors 'self'",
            },
          }
        );
   
        paList = paListRequest.data.gaList;
        paList.sort((a, b) => a.grantingAuthorityName.localeCompare(b.grantingAuthorityName));
    
      }catch(err){
        console.log("Error getting list of public authorities : " + err);
      }

      return res.render("publicusersearch/schemes", {
        filters,
        results: [],
        pageCount: 0,
        page: 0,
        size: 10,
        paList,
        errors
      });
    }

    const response = await axios.get(
      beisUrlPublicSearch + '/searchResults/schemes/export',
      {
        params: filters
      }
    );

    const schemes = Array.isArray(response.data)
        ? response.data
        : response.data.schemes || [];

    const exportRows = schemes.map(toSchemeExportRow);
    return processExport(exportRows, format, "subsidy_schemes_export", res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;