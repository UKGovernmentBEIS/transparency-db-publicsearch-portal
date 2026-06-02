// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const { debug } = require("request");

router.get("/", async (req, res) => {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    // Filter items from the request
    const filters = {
        keyword: req.query.keyword || '',
        ga: req.query.pa || '',
        geoLocation: req.query.geoLocation || '',
      };

    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 10);
    
    const backendPage = Math.max(page - 1, 0);
    var startRecord;
    var endRecord;
    var gaList = [];

    // Get list of public authorities for filter.
    try{
      const gaListRequest = await axios.get(
        beis_url_publicsearch + "/schemes/all_gas",
        {
          headers: {
            "X-Frame-Options": "DENY",
            "Content-Security-Policy": "frame-ancestors 'self'",
          },
        }
      );
 
      API_response_code = `${gaListRequest.status}`;
      console.log("All GAs API_response_code: try " + API_response_code);
      gaList = gaListRequest.data.gaList;
      gaList.sort((a, b) => a.grantingAuthorityName.localeCompare(b.grantingAuthorityName));
  
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
              }
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
            gaList,
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
        res.render("publicusersearch/noresults");
      }
  });
  
  module.exports = router;