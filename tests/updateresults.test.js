// ***********************************************************
// Automated Unit testing scripts for update results route
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

test("Unit testing for update results route - Test for POST call", (done) => {
  const req = mockRequest();
  global.current_page = "";
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = "";
  global.actual_subsidy_instrument_pass1 = "";
  global.actual_spending_sector_pass1 = "";
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "";
  global.sorting_order_pass = "";
  const res = {};
  axios.post.mockResolvedValue({
    data: [
      {
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
    ],
  });
  request(app)
    .post("/updateresults", (req, res))
    .expect(200, done);
});

// test("Unit testing for update results route Test for GET call", (done) => {
//   const req = mockRequest();

//   const res = {};
//   request(app)
//     .get("/updateresults", (req, res))
//     .expect(200, done);
// });
