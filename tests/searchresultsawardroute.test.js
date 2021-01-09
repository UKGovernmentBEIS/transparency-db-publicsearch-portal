// ***********************************************************
// Automated Unit testing scripts for search results award route
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

test("Unit testing for search results ward route Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_publicsearch  = "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  global.searchmeasuredetails = {
    awardNumber: 22,
    beneficiary: {
      beneficiaryName: "Absolem Productions Limited",
    },
    subsidyMeasure: {
      subsidyMeasureTitle: "COVID-19 Temporary Framework for UK authorities",
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
  };
  const res = {};

  axios.get.mockResolvedValue({
    status: "success",
    data: {
      awardNumber: 22,
      beneficiary: {
        beneficiaryName: "Absolem Productions Limited",
        orgSize: "",
        nationalIdType: "",
        nationalId: "",
      },
      grantingAuthorityResponse: {
        grantingAuthorityName: "",
      },
      subsidyMeasure: {
        subsidyMeasureTitle: "COVID-19 Temporary Framework for UK authorities",
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
      goodsServicesFilter: "",
    },
  });
  request(app)
    .get("/searchresultsawardroute", (req, res))
    .query({ page: "22" })
    .expect(200, done);
});
