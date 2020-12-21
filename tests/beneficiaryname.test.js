// ***********************************************************
// Automated Unit testing scripts for beneficiary name route
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

test("Beneficiary name route unit testing works fine", done => {
  request(app)
    .get("/subsidymeasuretitle")
    .expect(200, done);
});


const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });

const req = mockRequest(
    {},
    { Subsidy_measure_title : 'london'  }
  );

const res = {};

test("beneficiary name route works", done => {
    const req = mockRequest(
        {},
        { Subsidy_measure_title : 'london'  }
      );
    
    const res = {};
    request(app)
      .post("/beneficiaryname",(req, res) )
  
    .send({ Subsidy_measure_title: "london" })
      .expect(200, done);
  });

