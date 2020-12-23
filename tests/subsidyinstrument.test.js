// ***********************************************************
// Automated Unit testing scripts for subsidy instrument route
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

test("Unit testing for subsidy instrument route - Test for POST call", done => {
    global.subsidy_instrument_isfirst = "Yes";
    const req = mockRequest(
        {},
        { check_spendingsector: 'Education'  }
      );
    
    const res = {};
    request(app)
      .post("/subsidyinstrument",(req, res) )
      .send({ check_spendingsector : "Education"})
      .expect(200, done);
  });


  test("Unit testing for subsidy instrument route Test for GET call", done => {
     
    const req = mockRequest(
        {}
      
      );

    const res = {};
    request(app)
      .get("/subsidyinstrument",(req, res) )
      .expect(200, done);
  });
