// ********************************************************************
// Gov.UK public user mfa search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require('qs');
const utils = require("../utils");

router.get("/", async (req, res) => {
    utils.setSecurityHeaders(res, beis_url_publicsearch);
    const defaultSort = 'publishedDate,desc';

    var results = [];
    var pageCount = 0;
    var errors = [];

    // Filter items from the request
    const filters = {
        sort: req.query.sort || defaultSort,
        keyword: req.query.keyword || '',
        mfaAssistance: req.query.mfaAssistance || '',
        awardFullFromAmount : req.query.awardFullFromAmount || '',
        awardFullToAmount: req.query.awardFullToAmount || '',
        confirmationFromDay: req.query.confirmationFromDay || '',
        confirmationFromMonth: req.query.confirmationFromMonth || '',
        confirmationFromYear: req.query.confirmationFromYear || '',
        confirmationToDay: req.query.confirmationToDay || '',
        confirmationToMonth: req.query.confirmationToMonth || '',
        confirmationToYear: req.query.confirmationToYear || ''
      };

    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 10);
    
    const backendPage = Math.max(page - 1, 0);
    var startRecord;
    var endRecord;

    // Validate award full amount from and to
    var awardAmountErrors = utils.validateFromTo(filters.awardFullFromAmount, filters.awardFullToAmount);

    if (awardAmountErrors.hasErrors) {
      const fieldIds = {
        from: "awardFull-from-amount-input",
        to: "awardFull-to-amount-input"
      };
    
      awardAmountErrors.field = fieldIds[awardAmountErrors.field] ?? fieldIds.to;
      errors.push(awardAmountErrors);
    }

    if(errors.length > 0){
      return res.render("publicusersearch/mfaawards", {
        filters,
        results,
        pageCount,
        page,
        size,
        errors
    });
    }

    try {
        const apidata = await axios.get(
            beis_url_publicsearch + "/searchResults/mfaawards", {
              params:{
                page: backendPage,
                size,
                ...filters
              },
              paramsSerializer: params => qs.stringify(params, {
                arrayFormat: 'repeat',
                skipNulls: true
              })
            }
        );

        const results = apidata.data;
        const totalrows = results.totalSearchResults;
        const pageCount = Math.ceil(totalrows / size);

        if (page == 1) {
            startRecord = 1;
            endRecord = size;
          } else if (page == pageCount) {
            startRecord = (page - 1) * size + 1;
            endRecord = totalrows;
          } else {
            startRecord = page * size - size + 1;
            endRecord = page * size;
          }

        res.render("publicusersearch/mfaawards", {
            filters,
            results,
            pageCount,
            page,
            startRecord,
            endRecord,
            size,
            errors
        });
    } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
        res.render("publicusersearch/service-unavailable");
      }
  });
  
  module.exports = router;
