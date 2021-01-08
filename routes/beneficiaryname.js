// ********************************************************************
// Gov.UK public user search subsidy awards beneficiary name routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

// ********************************************************
// Read environment property file and set the API URL end points
// ********************************************************
Environment_variable = process.argv[2];
 
if ( Environment_variable == 'env=dev' ) {

beis_url_publishing = 'https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net';
beis_url_accessmanagement = 'https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net' ;
beis_url_publicsearch = 'https://dev-beis-tp-db-public-search-service.azurewebsites.net';
console.log(beis_url_publishing);
console.log(beis_url_accessmanagement);
console.log( beis_url_publicsearch);
}

else if (Environment_variable == 'env=integ') {

  beis_url_publishing = 'https://integ-beis-tp-db-publishing-subsidies-service.azurewebsites.net';
  beis_url_accessmanagement = 'https://integ-beis-tp-db-accessmanagement-service-app.azurewebsites.net' ;
  beis_url_publicsearch = 'https://integ-beis-tp-db-public-search-service.azurewebsites.net';
  console.log(beis_url_publishing);
  console.log(beis_url_accessmanagement);
  console.log( beis_url_publicsearch);

}

router.post('/', (req, res) => {
  radio_beneficiaryname = "";
  text_beneficiaryname = "";
  subsidy_objective_isfirst = "Yes";
  spending_sector_isfirst = "Yes";
  subsidy_instrument_isfirst = "Yes";
  console.log("subsidy_objective_isfirst bene :" + subsidy_objective_isfirst);
  res.render('publicusersearch/beneficiaryname');
});

router.get('/', (req, res) => {

  res.render('publicusersearch/beneficiaryname');

});


module.exports = router;