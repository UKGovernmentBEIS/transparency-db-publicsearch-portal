// ***********************************************************
// Automated Unit testing scripts for filter route
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

test("Unit testing for spending filter route - Test for POST call", done => {
    const req = mockRequest();
    global.current_page_active = 1;
    const res = {};
    request(app)
      .post("/filtersearch",(req, res) )
      .send({ showfiter : "Yes"})
      .expect(200, done);
  });

