const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.post('/return', (req, res) => {
    const returnUrl = req.body.returnUrl;

    if (
        typeof returnUrl !== 'string' ||
        !returnUrl.startsWith('/') ||
        returnUrl.startsWith('//') ||
        returnUrl.startsWith('/\\')
    ) {
        return res.status(400).send('Invalid return URL');
    }

    req.session.feedbackReturnUrl = returnUrl;

    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res
                .status(503)
                .render('publicusersearch/service-unavailable');
        }

        return res.redirect('/feedbackform/');
    });
});

router.get('/', (req, res) => {
    utils.setSecurityHeaders(res);

    res.render('publicusersearch/feedbackform', {
        backUrl: req.session.feedbackReturnUrl || '/',
    });
});

module.exports = router;
