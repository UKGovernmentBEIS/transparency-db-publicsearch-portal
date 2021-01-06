// ***********************************************************
// Automated Unit testing scripts for subsidy objective route
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

test("Unit testing for subsidy objective route - Test for with beneficiary name", done => {
  global.subsidy_objective_isfirst = "Yes";
    const req = mockRequest(
        {},
        { Beneficiary_name : 'SpiceJet Ltd'}
      );
    
    const res = {};
    request(app)
      .post("/subsidyobjective",(req, res) )
      .send({ Beneficiary_name : "SpiceJet Ltd", beneficiaryname : "Yes"})
      .expect(200, done);
      done();
  });


  test("Unit testing for subsidy objective route Test for with out beneficiary name", done => {
    const req = mockRequest(
        {},
        { radio_beneficiaryname : 'No'  }
      );
    
    const res = {};
    request(app)
      .post("/subsidyobjective",(req, res) )
      .send({ radio_beneficiaryname : "No"})
      .expect(200, done);
      done();
  });
