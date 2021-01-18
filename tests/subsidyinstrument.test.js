// ***********************************************************
// Automated Unit testing scripts for subsidy instrument route
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

test("Unit testing for subsidy instrument route - Test for POST call", (done) => {
  global.subsidy_instrument_isfirst = "Yes";
  const req = mockRequest({}, { check_spendingsector: "Education" });

  const res = {};
  request(app)
    .post("/subsidyinstrument", (req, res))
    .send({
      subsidy_instrument_isfirst: "Yes",
      check_spendingsector: "Education",
      spendingsector0: "Accommodation",
      spendingsector1:
        "Activities of extraterritorial organisations and bodies",
      spendingsector2: "Administrative and support service activities",
      spendingsector3: "Agriculture, forestry and fishing",
      spendingsector4: "Arts, entertainment and recreation",
      spendingsector5: "Construction",
      spendingsector6: "Education",
      spendingsector7: "Electricity, gas, steam and air conditioning supply",
      spendingsector8: "Financial and insurance activities",
      spendingsector9: "Human health and social work activities",
      spendingsector10: "Information and communication",
      spendingsector11: "Manufacturing",
      spendingsector12: "Mining and quarrying",
      spendingsector13: "Mining and quarrying",
      spendingsector14: "Mining and quarrying",
      spendingsector15: "Mining and quarrying",
      spendingsector16: "Mining and quarrying",
      spendingsector17: "Mining and quarrying",
      spendingsector18: "Mining and quarrying",
      spendingsector19: "Mining and quarrying",
      spendingsector20: "Mining and quarrying",
    })
    .expect(200, done);
  done();
});

test("Unit testing for subsidy instrument route - Test for POST call", (done) => {
  const req = mockRequest({}, { check_spendingsector: "Education" });
  global.subsidy_instrument_isfirst = "Yes";
  global.single_select = "Yes";
  const res = {};
  request(app)
    .post("/subsidyinstrument", (req, res))
    .expect(200, done);
  done();
});

test("Unit testing for subsidy instrument route Test for GET call", (done) => {
  const req = mockRequest({});

  const res = {};
  request(app)
    .get("/subsidyinstrument", (req, res))
    .expect(200, done);
});
