const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    ssn = req.session;
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    const site = getSiteUrl(req);
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

function getSiteUrl(req) {
    const proto = req.get("x-forwarded-proto") || req.protocol;
    const host = req.get("x-forwarded-host") || req.get("host");

    return `${proto}://${host}`;
}

module.exports = router;
