const express = require("express");
const router = express.Router();
const axios = require("axios");

const resourceConfig = {
    awards: {
        idField: "awardNumber"
    },
    schemes: {
        idField: "scNumber"
    },
};

router.get("/", async (req, res) => {
    setSecurityHeaders(req, res);

    try {
        const resource = getResourceName(req);
        const config = getResourceConfig(resource);

        const page = Number.isInteger(Number(req.query.page))
        ? Math.max(0, Number(req.query.page))
        : 0;

        const size = Number.isInteger(Number(req.query.size))
        ? Math.min(Math.max(1, Number(req.query.size)), 2000)
        : 20;

        const response = await axios.get(
        `${beis_url_publicsearch}${req.baseUrl}`,
        {
            params: {
                ...req.query,
                page,
                size
            }
        }
        );

        const site = `${req.protocol}://${req.get("host")}`;

        const data = addCollectionSelfLinks(
            response.data,
            site,
            resource,
            config
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.get("/:id", async (req, res) => {
    setSecurityHeaders(req, res);

    try {
        const resource = getResourceName(req);
        const config = getResourceConfig(resource);

        const response = await axios.get(
            `${beis_url_publicsearch}${req.baseUrl}/${encodeURIComponent(req.params.id)}`
        );

        const site = `${req.protocol}://${req.get("host")}`;

        const data = addSingleSelfLink(
            response.data,
            site,
            resource,
            config
        );

        res.json(data);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

function addCollectionSelfLinks(data, site, resource, config) {
    if (!data || !Array.isArray(data.content)) {
        return data;
    }

    return {
        ...data,
        content: data.content.map(item =>
            addSingleSelfLink(item, site, resource, config)
        )
    };
}

function addSingleSelfLink(item, site, resource, config) {
    if (!item) {
        return item;
    }

    const id = item[config.idField];

    if (!id) {
        return item;
    }

    return {
        ...item,
        _links: {
            ...(item._links || {}),
            self: {
                href: `${site}/api/${resource}/${encodeURIComponent(id)}`
            }
        }
    };
}

function getResourceName(req) {
    return req.baseUrl.replace("/api/", "");
}

function getResourceConfig(resource) {
    const config = resourceConfig[resource];

    if (!config) {
        throw new Error(`Unsupported API resource: ${resource}`);
    }

    return config;
}

function setSecurityHeaders(req, res) {
    ssn = req.session;

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
}

module.exports = router;