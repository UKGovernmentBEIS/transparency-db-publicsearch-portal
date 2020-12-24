// ***********************************************************
// Automated Unit testing scripts for spending sector route
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

test("Unit testing for spending sector route - Test for POST call", done => {
    global.spending_sector_isfirst = "Yes";
    const req = mockRequest(
        {},
        { check_subsidyobjective: 'Research and development'  }
      );
    
    const res = {};
    request(app)
      .post("/spendingsector",(req, res) )
      .send({ check_subsidyobjective : "Research and development", text_subsidyobjective : "Environmental protection"})
      .expect(200, done);
  });


  test("Unit testing for spending sector route Test for GET call", done => {
     
    const req = mockRequest(
        {}
      
      );

    const res = {};
    request(app)
      .get("/spendingsector",(req, res) )
      .expect(200, done);
  });
