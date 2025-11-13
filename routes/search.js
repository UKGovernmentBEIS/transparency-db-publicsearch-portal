// ********************************************************************
// Gov.UK public user search routing module
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

    const query = req.query.q;

    // query back end with query and render results

    const apidata = await axios.get(beis_url_publicsearch + '/searchResults/search?q=' + query);

    const awards = apidata.data.awards;

    res.render("publicusersearch/results", apidata.data);    
})

module.exports = router;