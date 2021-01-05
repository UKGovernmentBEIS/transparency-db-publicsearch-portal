// ***********************************************************
// Automated Unit testing scripts for hide filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
jest.mock('axios');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/",index);

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });


const res = {};

test("Unit testing for hide filter route - Test for POST call", done => {
    global.spending_sector_isfirst = "Yes";
    const req = mockRequest(
        {},
        { check_subsidyobjective: 'Research and development'  }
      );
    
    const res = {};
    request(app)
      .post("/hidefilter",(req, res) )
      .send({ check_subsidyobjective : "Research and development", text_subsidyobjective : "Environmental protection"})
      .expect(200, done);
  });


  test("Unit testing for hide filter route Test for GET call", done => {

    axios.post.mockResolvedValue({
      data: {
        "status": "success"}
    });
     
    const req = mockRequest();

    global.text_beneficiaryname="";
    global.actual_subsidy_objective_pass1=[];
    global.actual_subsidy_instrument_pass1=[];
    global.actual_spending_sector_pass1="";
    global.legal_granting_from_date="";
    global.legal_granting_to_date="";
    global.fetch_pagenumber="";
    global.frontend_totalRecordsPerPage=3;
    global.sorting_order_pass=[];
    global.pageCount=10;
    global.current_page_active=1;
    global.routing_pagenumber=1;

    const res = {};
    request(app)
      .get("/hidefilter",(req, res) )
      .expect(200, done);
      done();
  });
