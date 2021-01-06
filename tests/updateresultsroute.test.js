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
const { query } = require("express");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for update results route Test for GET call", async() => {
  const req = mockRequest();
  global.current_page = "";
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  const res = {};
  axios.post.mockResolvedValue({
    status: "success",
    data: {
      totalSearchResults: 49,
      currentPage: 2,
      totalPages: 5,
      awards: [
        {
          awardNumber: 33,
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
          subsidyFullAmountExact: "54,308",
          subsidyObjective: "Energy efficiency",
          subsidyInstrument: "Direct Grant",
          spendingSector: "Human health and social work activities",
          legalGrantingDate: "21 September 2020",
          spendingRegion: "Scotland",
        },
      ],
    },
  });
  request(app)
    .get("/updateresultsroute", (req, res))
    .query({ page: "2" })
    .expect(200);
});
