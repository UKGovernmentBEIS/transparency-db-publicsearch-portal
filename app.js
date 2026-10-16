// *************************************************************
// Gov.UK public user search - App.js is the subset of server.js
// *************************************************************

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
var cors = require('cors');
app.use(cors());
const utils = require('./utils');

// *************************************************************
// Redis session configuration
// *************************************************************

const session = require('express-session');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

app.use(async (req, res, next) => {
    const isHtmlPage =
        req.method === 'GET' &&
        (req.headers.accept || '').includes('text/html') &&
        req.path !== '/back' &&
        !req.path.startsWith('/api') &&
        !req.path.startsWith('/assets') &&
        !/\.[^/]+$/.test(req.path);

    if (!isHtmlPage) {
        return next();
    }

    try {
        const history = req.session.pageHistory || [];
        const requestedUrl = req.originalUrl;

        // Avoid duplicate entries for the same page.
        if (history[history.length - 1] !== requestedUrl) {
            history.push(requestedUrl);
        }

        // Limit history size.
        req.session.pageHistory = history.slice(-50);

        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        next();
    } catch (err) {
        next(err);
    }
});

app.get('/back', (req, res) => {
    const history = req.session.pageHistory || [];

    if (history.length < 2) {
        return res.redirect('/');
    }

    // Remove the page being left.
    history.pop();

    const previousPage = history[history.length - 1];

    req.session.pageHistory = history;

    req.session.save((err) => {
        if (err) {
            console.error('Failed to save navigation history:', err);
            return res.status(500).send('Unable to navigate back.');
        }

        res.redirect(previousPage);
    });
});

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get('/', (req, res) => {
    utils.setSecurityHeaders(res);

    res.render('publicusersearch/homepage');
});

/****************************************************** */
/* All Router declarations */
/****************************************************** */

var homepage = require('./routes/homepage');
app.use('/homepage', homepage);

var noresults = require('./routes/noresults');
app.use('/noresults', noresults);

var schemedetailsroute = require('./routes/schemedetailsroute');
app.use('/scheme', schemedetailsroute);

var schemeVersionRoute = require('./routes/schemeversionroute');
app.use('/schemeversion', schemeVersionRoute);

var feedbackform = require('./routes/feedbackform');
app.use('/feedbackform', feedbackform);

var submitfeedback = require('./routes/submitfeedback');
app.use('/submitfeedback', submitfeedback);

var accessibilityStatement = require('./routes/accessibilityStatement');
app.use('/accessibilityStatement', accessibilityStatement);

app.use('/mfaawards', require('./routes/mfaawards'));
app.use('/mfaaward', require('./routes/mfaawarddetails'));
app.use('/mfaawards/export', require('./routes/mfaAwardsExport'));

// Cookies Consent

var cookieshelp = require('./routes/cookies-help');
app.use('/cookieshelp', cookieshelp);

// Privacy Notice
var privacynotice = require('./routes/privacy-notice');
app.use('/privacy', privacynotice);

app.use('/awards', require('./routes/awards'));
app.use('/award', require('./routes/awarddetails'));
app.use('/awards/export', require('./routes/awardsExport'));

app.use('/schemes', require('./routes/schemes'));
app.use('/schemes/export', require('./routes/schemesExport'));

app.use('/', require('./routes/redirectroute'));

app.use((req, res) => {
    res.status(404).render('publicusersearch/404');
});

module.exports = app;
