// ***********************************************************
// Automated Unit testing scripts for page route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
jest.mock("axios");
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

test("Unit testing for page route - Test for POST call", async () => {
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  const req = mockRequest();
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
  const res = {};
  request(app)
    .post("/pageroute", (req, res))
    .expect(200);
});

test("Unit testing for page route Test for GET call", (done) => {
  const req = mockRequest();
  axios.post.mockResolvedValue({
    status: 200,
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
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  global.current_page = "2";
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

  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.beneficiary_sorting_order = "asc";
  global.legalgrantingdate_sorting_order = "asc";
  global.subsidyamount_sorting_order = "asc";

  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];

  global.pageCount = 10;
  global.current_page_active = 1;
  global.frontend_totalRecordsPerPage = 10;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;
  global.previous_page = 1;
  global.next_page = 2;
  global.beneficiary_arrow = "upanddown";
  global.legalgrantingdate_arrow = "upanddown";
  global.subsidyamount_arrow = "upanddown";
  const data_request = {
    beneficiaryName: "",
    subsidyMeasureTitle: "",
    subsidyObjective: [],
    spendingRegion: [],
    subsidyInstrument: [],
    spendingSector: [],
    legalGrantingFromDate: "",
    legalGrantingToDate: "",
    pageNumber: 1,
    totalRecordsPerPage: 500000,
    sortBy: [""],
  };

  global.data_request_clientside = JSON.stringify(data_request);
  global.searchawards = {
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
  };

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: "2" })
    // expect(resp).toBe(200);
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
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
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.beneficiary_sorting_order = "asc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999997 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.beneficiary_sorting_order = "desc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999997 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.legalgrantingdate_sorting_order = "asc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999998 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
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

  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.beneficiary_sorting_order = "asc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999997 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.legalgrantingdate_sorting_order = "desc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999998 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
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

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.subsidyamount_sorting_order = "desc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999999 })
    .expect(200, done);
});

test("Unit testing for page route Test for GET call", (done) => {
  const data_request = {
    beneficiaryName: "",
    subsidyMeasureTitle: "",
    subsidyObjective: [],
    spendingRegion: [],
    subsidyInstrument: [],
    spendingSector: [],
    legalGrantingFromDate: "",
    legalGrantingToDate: "",
    pageNumber: 1,
    totalRecordsPerPage: 500000,
    sortBy: [""],
  };
  global.data_request_clientside = JSON.stringify(data_request);
  global.searchawards = {
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
  };
  axios.post.mockResolvedValue({
    status: "success",
    data_request_clientside: JSON.stringify(data_request),
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

  global.current_page_active = 1;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.previous_page = 1;
  global.next_page = 2;
  global.beneficiary_arrow = "upanddown";
  global.legalgrantingdate_arrow = "upanddown";
  global.subsidyamount_arrow = "upanddown";

  global.current_page = "";
  global.start_page = 1;
  global.end_page = 1;
  global.pageCount = 10;
  global.text_beneficiaryname = "";
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];
  global.subsidyamount_sorting_order = "asc";
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-public-search-service.azurewebsites.net";

  const req = mockRequest();

  const res = {};
  request(app)
    .get("/pageroute", (req, res))
    .query({ page: 999999 })
    .expect(200, done);
});
