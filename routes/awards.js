// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require('qs');
const utils = require("../utils");

router.get("/", async (req, res) => {
    utils.setSecurityHeaders(res, beis_url_publicsearch);

    var errors = [];
    const filters = utils.getFilters(req,"award");

    const confirmationDateFrom = utils.buildDateFromStrings(filters.confirmationFromDay, filters.confirmationFromMonth, filters.confirmationFromYear);
    const confirmationDateTo = utils.buildDateFromStrings(filters.confirmationToDay, filters.confirmationToMonth, filters.confirmationToYear);

    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 10);
    const sort = (req.query.sort || defaultSort);
    
    const backendPage = Math.max(page - 1, 0);
    var startRecord;
    var endRecord;
    var paList = [];

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

    // Validate confirmation date from and to
    var confirmationDateErrors = utils.validateDateFromTo(confirmationDateFrom, confirmationDateTo)
    
    if (confirmationDateErrors.hasErrors){
      const fieldIds = {
        from: "confirmation-filter-from-day",
        to: "confirmation-filter-to-day",
      };

      confirmationDateErrors.field = fieldIds[confirmationDateErrors.field] ?? fieldIds.to;
      errors.push(confirmationDateErrors);
    }

    if(errors.length > 0){

      try{
        const paListRequest = await axios.get(
          beis_url_publicsearch + "/schemes/all_gas",
          {
            headers: {
              "X-Frame-Options": "DENY",
              "Content-Security-Policy": "frame-ancestors 'self'",
            },
          }
        );

        API_response_code = `${paListRequest.status}`;
        paList = paListRequest.data.gaList;
        paList.sort((a, b) => a.grantingAuthorityName.localeCompare(b.grantingAuthorityName));

      }catch(err){
        console.log("Error getting list of public authorities : " + err);
      }

      return res.render("publicusersearch/awards", {
        filters,
        results: [],
        pageCount: 0,
        page: 0,
        size: 10,
        errors,
        paList
      });
    }


    // Get list of public authorities for filter.
    try{
      const paListRequest = await axios.get(
        beis_url_publicsearch + "/searchResults/all_gas",
        {
          headers: {
            "X-Frame-Options": "DENY",
            "Content-Security-Policy": "frame-ancestors 'self'",
          },
        }
      );
 
      API_response_code = `${paListRequest.status}`;
      paList = paListRequest.data.gaList;
      paList.sort((a, b) => a.grantingAuthorityName.localeCompare(b.grantingAuthorityName));
  
    }catch(err){
      console.log("Error getting list of public authorities : " + err);
    }

    try {
        const apidata = await axios.get(
            beis_url_publicsearch + "/searchResults/awards", {
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

        res.render("publicusersearch/awards", {
            filters,
            results,
            paList,
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
