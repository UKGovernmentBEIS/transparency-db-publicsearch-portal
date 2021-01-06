// ***********************************************************
// Automated Unit testing scripts for hide filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
jest.mock("axios");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for hide filter route - Test for POST call", async() => {
  global.spending_sector_isfirst = "Yes";
  const req = mockRequest(
    {},
    { check_subsidyobjective: "Research and development" }
  );
  axios.post.mockResolvedValue({
    data: [
      {
        totalSearchResults: 49,
        currentPage: 1,
        totalPages: 5,
        awards: [
          {
            awardNumber: 22,
            beneficiary: { beneficiaryName: "Absolem Productions Limited" },
            subsidyMeasure: {
              subsidyMeasureTitle:
                "COVID-19 Temporary Framework for UK authorities",
              scNumber: "SC10033",
              adhoc: false,
              legalBasis: { legalBasisText: "R&D&I Framework" },
            },
            subsidyFullAmountRange: "£NA",
            subsidyFullAmountExact: "597,336",
            subsidyObjective: "Energy efficiency",
            subsidyInstrument: "Direct Grant",
            spendingSector: "Administrative and support service activities",
            legalGrantingDate: "13 October 2020",
            spendingRegion: "Scotland",
          },
        ],
      },
    ],
  });
  const res = {};
  request(app)
    .post("/hidefilter", (req, res))
    .expect(200);
});

test("Unit testing for hide filter route Test for GET call", async() => {
  const req = mockRequest();

  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = "";
  global.legal_granting_from_date = "";
  global.legal_granting_to_date = "";
  global.fetch_pagenumber = "";
  global.frontend_totalRecordsPerPage = 3;
  global.sorting_order_pass = [];
  global.pageCount = 10;
  global.current_page_active = 1;
  global.routing_pagenumber = 1;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 49,
      currentPage: 1,
      totalPages: 5,
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
  const res = {};
  request(app)
    .get("/hidefilter", (req, res))
    .query({ page: 2 })
    .expect(200);
});
