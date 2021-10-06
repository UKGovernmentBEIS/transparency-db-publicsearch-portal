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

  global.legal_granting_from_date = "";
  global.legal_granting_to_date = "";
  global.sorting_order_pass = "";
  global.actual_subsidy_objective = '"Employment"';
  global.actual_spending_sector = '"Accommodation"';
  global.actual_subsidy_instrument = '"Guarantee"';

  global.check_subsidyobjective0 = "";
  global.check_subsidyobjective1 = "";
  global.check_subsidyobjective2 = "";
  global.check_subsidyobjective3 = "";
  global.check_subsidyobjective4 = "";
  global.check_subsidyobjective5 = "";
  global.check_subsidyobjective6 = "";
  global.check_subsidyobjective7 = "";
  global.check_subsidyobjective8 = "";
  global.check_subsidyobjective8a = "";
  global.check_subsidyobjective9 = "";
  global.check_subsidyobjective10 = "";
  global.check_subsidyobjective11_pass = "";
  global.check_subsidyobjective12_pass = "";

  global.check_spendingsector0 = "";
  global.check_spendingsector1 = "";
  global.check_spendingsector2 = "";
  global.check_spendingsector18 = "";
  global.check_spendingsector3 = "";
  global.check_spendingsector4 = "";
  global.check_spendingsector5 = "";
  global.check_spendingsector6 = "";
  global.check_spendingsector7 = "";
  global.check_spendingsector8 = "";
  global.check_spendingsector9 = "";
  global.check_spendingsector10 = "";
  global.check_spendingsector11 = "";
  global.check_spendingsector12 = "";
  global.check_spendingsector13 = "";
  global.check_spendingsector13a = "";
  global.check_spendingsector14 = "";
  global.check_spendingsector15 = "";
  global.check_spendingsector16 = "";
  global.check_spendingsector17 = "";
  global.check_spendingsector19 = "";
  global.check_spendingsector20 = "";

  global.check_subsidyinstrument0 = "";
  global.check_subsidyinstrument1 = "";
  global.check_subsidyinstrument2 = "";
  global.check_subsidyinstrument3 = "";
  global.check_subsidyinstrument4 = "";
  global.check_subsidyinstrument5 = "";
  global.check_subsidyinstrument6 = "";
  global.check_subsidyinstrument7 = "";
  global.check_subsidyinstrument8_pass = "";
  global.check_subsidyinstrument9_pass = "";

  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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

test("Unit testing for search results route - Test for POST call", (done) => {
  const req = mockRequest();
  global.text_beneficiaryname = "";

  global.check_subsidyobjective0 = "";
  global.check_subsidyobjective1 = "";
  global.check_subsidyobjective2 = "";
  global.check_subsidyobjective3 = "";
  global.check_subsidyobjective4 = "";
  global.check_subsidyobjective5 = "";
  global.check_subsidyobjective6 = "";
  global.check_subsidyobjective7 = "";
  global.check_subsidyobjective8 = "";
  global.check_subsidyobjective8a = "";
  global.check_subsidyobjective9 = "";
  global.check_subsidyobjective10 = "";
  global.check_subsidyobjective11_pass = "";
  global.check_subsidyobjective12_pass = "";

  global.check_spendingsector0 = "";
  global.check_spendingsector1 = "";
  global.check_spendingsector2 = "";
  global.check_spendingsector18 = "";
  global.check_spendingsector3 = "";
  global.check_spendingsector4 = "";
  global.check_spendingsector5 = "";
  global.check_spendingsector6 = "";
  global.check_spendingsector7 = "";
  global.check_spendingsector8 = "";
  global.check_spendingsector9 = "";
  global.check_spendingsector10 = "";
  global.check_spendingsector11 = "";
  global.check_spendingsector12 = "";
  global.check_spendingsector13 = "";
  global.check_spendingsector13a = "";
  global.check_spendingsector14 = "";
  global.check_spendingsector15 = "";
  global.check_spendingsector16 = "";
  global.check_spendingsector17 = "";
  global.check_spendingsector19 = "";
  global.check_spendingsector20 = "";

  global.check_subsidyinstrument0 = "";
  global.check_subsidyinstrument1 = "";
  global.check_subsidyinstrument2 = "";
  global.check_subsidyinstrument3 = "";
  global.check_subsidyinstrument4 = "";
  global.check_subsidyinstrument5 = "";
  global.check_subsidyinstrument6 = "";
  global.check_subsidyinstrument7 = "";
  global.check_subsidyinstrument8_pass = "";
  global.check_subsidyinstrument9_pass = "";
  global.legal_granting_from_date = "";
  global.legal_granting_to_date = "";
  global.sorting_order_pass = "";
  global.actual_subsidy_objective = '"Employment"';
  global.actual_spending_sector = '"Accommodation"';
  global.actual_subsidy_instrument = '"Guarantee"';
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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
      legal_granting_date_day: "1",
      legal_granting_date_month: "1",
      legal_granting_date_year: "2020",
      legal_granting_date_day1: "1",
      legal_granting_date_month1: "1",
      legal_granting_date_year1: "2020",
    })
    .expect(200, done);
});

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
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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
      legal_granting_date_day: "32",
      legal_granting_date_month: "13",
      legal_granting_date_year: "2020",
      legal_granting_date_day1: "32",
      legal_granting_date_month1: "13",
      legal_granting_date_year1: "2020",
    })
    .expect(200, done);
});

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
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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
      legal_granting_date_day: "31",
      legal_granting_date_month: "02",
      legal_granting_date_year: "2020",
      legal_granting_date_day1: "31",
      legal_granting_date_month1: "02",
      legal_granting_date_year1: "2020",
    })
    .expect(200, done);
});
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
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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
      legal_granting_date_day: "29",
      legal_granting_date_month: "02",
      legal_granting_date_year: "2020",
      legal_granting_date_day1: "29",
      legal_granting_date_month1: "02",
      legal_granting_date_year1: "2020",
    })
    .expect(200, done);
});

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
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
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
      legal_granting_date_day: "",
      legal_granting_date_month: "",
      legal_granting_date_year: "",
      legal_granting_date_day1: "",
      legal_granting_date_month1: "",
      legal_granting_date_year1: "",
    })
    .expect(200, done);
});

test("Unit testing for search results route Test for GET call", (done) => {
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
  request(app)
    .get("/searchresults", (req, res))
    .expect(200, done);
});
