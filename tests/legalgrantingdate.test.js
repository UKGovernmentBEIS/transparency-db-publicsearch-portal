// ***********************************************************
// Automated Unit testing scripts for legal granting date route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for legal granting date route - Test for POST call", (done) => {
  const req = mockRequest(
    {},
    { check_subsidyinstrument0: "Equity", subsidyinstrument0: "Loan" }
  );

  const res = {};
  request(app)
    .post("/legalgrantingdate", (req, res))
    .send({
      check_subsidyinstrument0: "Equity",
      subsidyinstrument0: "Loan",
      subsidyinstrument1: "Guarantee",
      subsidyinstrument2: "Loan",
      subsidyinstrument3: "Purchase of goods or services above market prices",
      subsidyinstrument4: "Sale of goods or services below market prices",
      subsidyinstrument5: "Tax measures (tax credit, or tax/duty exemption)",
      subsidyinstrument6: "Direct Grant",
      subsidyinstrument7: "Loan",
      subsidyinstrument8: "Loan",
      subsidyinstrument9: "Loan",
    })
    .expect(200, done);
});

test("Unit testing for legal granting date route - Test for POST call", (done) => {
  const req = mockRequest(
    {},
    { check_subsidyinstrument0: "Equity", subsidyinstrument0: "Loan" }
  );
  global.single_select = "Yes";
  const res = {};
  request(app)
    .post("/legalgrantingdate", (req, res))
    .expect(200, done);
});

test("Unit testing for legal granting date route Test for GET call", (done) => {
  const req = mockRequest({});

  const res = {};
  request(app)
    .get("/legalgrantingdate", (req, res))
    .expect(200, done);
});
