// redirect users who may have bookmarked old URLs to the new pages

const express = require("express");
const router = express.Router();
const utils = require("../utils");


// /searchresults -> /awards
router.get("/searchresults", async (req, res) => {
    utils.setSecurityHeaders(res, beis_url_publicsearch);
    res.writeHead(301, {
        'Location': '/awards'  
    });
    res.end();
});

// /searchresultsawardroute/?page=123 -> /award/?award=123
router.get("/searchresultsawardroute", async (req, res) => {
    utils.setSecurityHeaders(res, beis_url_publicsearch);
    const awardnumber = req.query.page || '0';
    res.writeHead(301, {
        'Location': '/award/?award=' + awardnumber  
    });
    res.end();
});

module.exports = router;