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

    // Filter items from the request
    const filters = {
        sort: req.query.sort || defaultSort,
        keyword: req.query.keyword || '',
      };

    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 10);
    
    const backendPage = Math.max(page - 1, 0);
    var startRecord;
    var endRecord;

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
            size
        });
    } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
        res.render("publicusersearch/service-unavailable");
      }
  });
  
  module.exports = router;
