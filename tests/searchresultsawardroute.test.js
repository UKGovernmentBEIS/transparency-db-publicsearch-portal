// ***********************************************************
// Automated Unit testing scripts for search results award route
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

  test("Unit testing for search results ward route Test for GET call", done => {
     
    const req = mockRequest( );

    const res = {};
    request(app)
      .get("/searchresultsawardroute",(req, res) )
      .expect(200, done);
  });
