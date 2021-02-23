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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

const res = {};

test("beneficiary name route works", (done) => {
  const req = mockRequest();
  global.process.argv = ["", "", "env=dev"];
  global.text_beneficiaryname = "";
  global.radio_beneficiaryname = "No";
  global.beis_url_publicsearch = "";
  const res = {};
  request(app)
    .post("/beneficiaryname", (req, res))
    .send({
      homepage_button: "start_now",
    })
    .expect(200, done);
});

test("beneficiary name route works", (done) => {
  const req = mockRequest();
  global.process.argv = ["", "", "env=stag"];
  global.text_beneficiaryname = "";
  global.radio_beneficiaryname = "Yes";
  global.beis_url_publicsearch = "";
  const res = {};
  request(app)
    .post("/beneficiaryname", (req, res))
    .send({
      homepage_button: "start_now",
    })
    .expect(200, done);
});

test("beneficiary name route works", (done) => {
  const req = mockRequest();
  global.process.argv = ["", "", "env=integ"];
  global.text_beneficiaryname = "";
  global.radio_beneficiaryname = "No";
  global.beis_url_publicsearch = "";
  const res = {};

  request(app)
    .post("/beneficiaryname", (req, res))
    .send({
      homepage_button: "start_now",
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
