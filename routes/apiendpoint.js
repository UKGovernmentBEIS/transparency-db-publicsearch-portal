const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    ssn = req.session;
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    try {

        const page = Number.isInteger(Number(req.query.page))
        ? Math.max(0, Number(req.query.page))
        : 0;

        const size = Number.isInteger(Number(req.query.size))
        ? Math.min(Math.max(1, Number(req.query.size)), 2000)
        : 20;

        const url = req.baseUrl;

        const response = await axios.get(
            beis_url_publicsearch + url,
        {
            params: {
            page,
            size
            }
        }
        );

        res.json(response.data);

    } catch (err) {
        res.status(500).json({
        error: err.message
        });
    }
});

module.exports = router;
