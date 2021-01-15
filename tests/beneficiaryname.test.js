// ***********************************************************
// Automated Unit testing scripts for beneficiary name route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

const res = {};

test("beneficiary name route works", (done) => {
  const req = mockRequest(
    {},
    {
      Subsidy_measure_title: "london",
      homepage_button : "start_now"
    }
  );

  const res = {};
  request(app)
    .post("/beneficiaryname", (req, res))

    .send({
      Subsidy_measure_title: "london",
      homepage_button : "start_now"
    })
    .expect(200, done);
});

test("beneficiary name GET route works", (done) => {
  const req = mockRequest({});

  const res = {};
  request(app)
    .get("/beneficiaryname", (req, res))
    .expect(200, done);
});
