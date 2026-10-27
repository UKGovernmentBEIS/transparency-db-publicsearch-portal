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
const { sessionPrefix } = require('./config');
const { logRedisError } = require('./utils');

// *************************************************************
// Redis session configuration
// *************************************************************

const session = require('express-session');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
    logRedisError(err, 'Redis client error');
});

redisClient.on('ready', () => {
    console.log('Redis is ready');
});

redisClient.on('reconnecting', () => {
    console.warn('Redis is reconnecting');
});

redisClient.connect().catch((err) => {
    logRedisError(err, 'Redis initial connection failed');
});

app.use((req, res, next) => {
    if (!redisClient.isReady) {
        return res.status(503).render('publicusersearch/service-unavailable');
    }

    next();
});

const store = new RedisStore({
    client: redisClient,
    prefix: `${sessionPrefix}:sess:`,
});

app.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

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
