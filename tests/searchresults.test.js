// ***********************************************************
// Automated Unit testing scripts for search results route
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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for search results route - Test for POST call", (done) => {
  const req = mockRequest();
  global.text_beneficiaryname = "";

  global.actual_subsidy_objective_pass1 = "";
  global.actual_subsidy_instrument_pass1 = "";
  global.actual_spending_sector_pass1 = "";
  global.legal_granting_from_date = "";
  global.legal_granting_to_date = "";
  global.sorting_order_pass = "";
  global.actual_subsidy_objective = '"Employment"';
  global.actual_spending_sector = '"Accommodation"';
  global.actual_subsidy_instrument = '"Guarantee"';
  const res = {};
  axios.post.mockResolvedValue({
    status: "success",
    data: {
      totalSearchResults: 49,
      currentPage: 1,
      totalPages: 1,
      awards: [
        {
          awardNumber: 22,
          beneficiary: {
            beneficiaryName: "Absolem Productions Limited",
          },
          subsidyMeasure: {
            subsidyMeasureTitle:
              "COVID-19 Temporary Framework for UK authorities",
            scNumber: "SC10033",
            adhoc: false,
            legalBasis: {
              legalBasisText: "R&D&I Framework",
            },
          },
          subsidyFullAmountRange: "£NA",
          subsidyFullAmountExact: "597,336",
          subsidyObjective: "Energy efficiency",
          subsidyInstrument: "Direct Grant",
          spendingSector: "Arts, entertainment and recreation",
          legalGrantingDate: "13 October 2020",
          spendingRegion: "Scotland",
        },
      ],
    },
  });
  request(app)
    .post("/searchresults", (req, res))
    .send({
      legal_granting_date_day: "01",
      legal_granting_date_month: "01",
      legal_granting_date_year: "2020",
      legal_granting_date_day1: "01",
      legal_granting_date_month1: "01",
      legal_granting_date_year1: "2020",
    })
    .expect(200, done);
});

test("Unit testing for search results route Test for GET call", async () => {
  const req = mockRequest({});
  global.date_legal_granting_date_day = "01";
  global.date_legal_granting_date_month = "01";
  global.date_legal_granting_date_year = "2020";
  global.date_legal_granting_date_day1 = "01";
  global.date_legal_granting_date_month1 = "01";
  global.date_legal_granting_date_year1 = "2020";
  global.date_legal_granting_date_month_Error = "";
  global.date_legal_granting_date_day_Error = "";
  global.date_legal_granting_date_year_Error = "";
  global.date_legal_granting_date_month1_Error = "";
  global.date_legal_granting_date_day1_Error = "";
  global.date_legal_granting_date_year1_Error = "";
  const res = {};
  await request(app)
    .get("/searchresults", (req, res))
    .expect(200);
});
