const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    ssn = req.session;
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    const site = req.protocol + '://' + req.get('host');
    const apiEndpoints = ["awards", "schemes", "mfaAwards"];

    const _links = apiEndpoints.reduce((acc, endpoint) => {
        acc[endpoint] = {
            href: `${site}/api/${endpoint}{?page,size,sort}`
        };

        return acc;
    }, {});

    res.json({
        _links
    });
});

module.exports = router;
