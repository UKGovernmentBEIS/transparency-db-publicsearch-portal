const express = require("express");
const router = express.Router();
const axios = require("axios");
const http = require("http");

const resourceConfig = {
    awards: {
        idField: "awardNumber"
    },
    schemes: {
        idField: "scNumber"
    },
    mfaAwards: {
        idField: "mfaAwardNumber"
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
        const status = mapAxiosErrorToStatus(err);

        res.status(status).json({
            error: getErrorMessage(err, status)
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

        const data = addItemLinks(
            response.data,
            site,
            resource,
            config
        );

        res.json(data);

    } catch (err) {
        const status = mapAxiosErrorToStatus(err);

        res.status(status).json({
            error: getErrorMessage(err, status)
        });
    }
});

function mapAxiosErrorToStatus(err) {
    // Backend returned an HTTP response, e.g. 400, 404, 500
    if (err.response) {
        return err.response.status || 502;
    }

    // Backend did not respond
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
        return 504; // Gateway Timeout
    }

    if (err.code === "ECONNREFUSED" || err.request) {
        return 503; // Service Unavailable
    }

    // Something failed in the Express layer before/during the request
    return 500;
}

function getErrorMessage(err, status) {
    return (
        err.response?.data?.message ||
        err.response?.data?.error ||
        http.STATUS_CODES[status] ||
        http.STATUS_CODES[500]
    );
}

function addCollectionSelfLinks(data, site, resource, config) {
    if (!data || !Array.isArray(data.content)) {
        return data;
    }

    return {
        ...data,
        content: data.content.map(item =>
            addItemLinks(item, site, resource, config)
        )
    };
}

function addItemLinks(item, site, resource, config) {
    if (!item) {
        return item;
    }

    const id = item[config.idField];

    const links = {
        ...(item._links || {})
    };

    if (id) {
        links.self = {
            href: `${site}/api/${resource}/${encodeURIComponent(id)}`
        };
    }

    if (resource === "awards") {
        const scNumber = getAssociatedScNumber(item);

        if (scNumber) {
            links.scheme = {
                href: `${site}/api/schemes/${encodeURIComponent(scNumber)}`
            };
        }
    }

    return {
        ...item,
        _links: links
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

function getAssociatedScNumber(item){
    return item.subsidyScheme && item.subsidyScheme.scNumber
        ? item.subsidyScheme.scNumber
        : null;
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