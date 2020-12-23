// ***********************************************************
// Automated Unit testing scripts for search results route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use("/",index);

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });


const res = {};

test("Unit testing for search results route - Test for POST call", done => {
    const req = mockRequest();
    global.text_beneficiaryname = "";
    global.actual_subsidy_objective_pass1 = "";
    global.actual_subsidy_instrument_pass1 = "";
    global.actual_spending_sector_pass1 = "";
    global.legal_granting_from_date = "";
    global.legal_granting_to_date = "";
    global.sorting_order_pass = "";
    const res = {};
    request(app)
      .post("/searchresults",(req, res) )
      .expect(200, done);
  });


  test("Unit testing for search results route Test for GET call", done => {
     
    const req = mockRequest( );

    const res = {};
    request(app)
      .get("/searchresults",(req, res) )
      .expect(200, done);
  });
