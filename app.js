
// *************************************************************
// Gov.UK public user search - App.js is the subset of server.js
// *************************************************************

const express = require('express')
const app = express()
const fs = require("fs");
const request = require("request");
const methodOverride = require('method-override')
const path = require('path')
const fileUpload = require('express-fileupload')
const fetch = require("node-fetch");
const { callbackify } = require('util')
const { Http2ServerRequest } = require('http2');
const { contains } = require('jquery');
const axios = require('axios');
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

// ********************************************************
// Gov.UK public user search - Global variable declarations
// ********************************************************

app.locals.radio_beneficiaryname;
app.locals.text_beneficiaryname;
app.locals.check_subsidyobjective;
app.locals.text_subsidyobjective;
app.locals.check_spendingsector;
app.locals.check_subsidyinstrument;
app.locals.text_subsidyinstrument;
app.locals.radio_legalgrantingdate;
app.locals.date_legal_granting_date_day;
app.locals.date_legal_granting_date_month;
app.locals.date_legal_granting_date_year;
app.locals.date_legal_granting_date_day1;
app.locals.date_legal_granting_date_month1;
app.locals.date_legal_granting_date_year1;
app.locals.legal_granting_from_date;
app.locals.legal_granting_to_date;
app.locals.frontend_totalRecordsPerPage;
app.locals.previous_page;
app.locals.next_page;
app.locals.email_addresspass;
app.locals.searchawards;
app.locals.pageCount;
app.locals.rowsperpage;
app.locals.totalrows;
app.locals.start_record;
app.locals.end_record;
app.locals.current_page_active;


/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get('/',(req, res) => {
  res.render('publicusersearch/homepage')
})

/****************************************************** */
/* All Router declarations */
/****************************************************** */

var homepage = require('./routes/homepage');
app.use('/homepage',homepage);


var subsidymeasuretitle = require('./routes/subsidymeasuretitle');
app.use('/subsidymeasuretitle',subsidymeasuretitle);

var beneficiaryname = require('./routes/beneficiaryname');
app.use('/beneficiaryname',beneficiaryname);

var subsidyobjective = require('./routes/subsidyobjective');
app.use('/subsidyobjective',subsidyobjective);

var spendingregion = require('./routes/spendingregion');
app.use('/spendingregion',spendingregion);

var sizeoforganisation = require('./routes/sizeoforganisation');
app.use('/sizeoforganisation',sizeoforganisation);

var subsidyinstrument = require('./routes/subsidyinstrument');
app.use('/subsidyinstrument',subsidyinstrument);


var spendingsector = require('./routes/spendingsector');
app.use('/spendingsector',spendingsector);

var legalgrantingdate = require('./routes/legalgrantingdate');
app.use('/legalgrantingdate',legalgrantingdate);

var searchresults = require('./routes/searchresults');
app.use('/searchresults',searchresults);


var pageroute = require('./routes/pageroute');
app.use('/pageroute',pageroute);


module.exports = app;