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
  global.actual_subsidy_objective_pass1 = [];
  global.actual_subsidy_instrument_pass1 = [];
  global.actual_spending_sector_pass1 = [];
  global.legal_granting_to_date = "";
  global.legal_granting_from_date = "";
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = [""];

  global.check_subsidyobjective0 = "";
  global.check_subsidyobjective1 = "";
  global.check_subsidyobjective2 = "";
  global.check_subsidyobjective3 = "";
  global.check_subsidyobjective4 = "";
  global.check_subsidyobjective5 = "";
  global.check_subsidyobjective6 = "";
  global.check_subsidyobjective7 = "";
  global.check_subsidyobjective8 = "";
  global.check_subsidyobjective9 = "";
  global.check_subsidyobjective10 = "";
  global.check_subsidyobjective11 = "";
  global.check_subsidyobjective12_pass = "";
  global.check_subsidyinstrument0 = "";
  global.check_subsidyinstrument1 = "";
  global.check_subsidyinstrument2 = "";
  global.check_subsidyinstrument3 = "";
  global.check_subsidyinstrument4 = "";
  global.check_subsidyinstrument5 = "";
  global.check_subsidyinstrument6 = "";
  global.check_subsidyinstrument7 = "";
  global.check_subsidyinstrument8 = "";
  global.check_subsidyinstrument9_pass = "";
  global.check_spendingsector0 = "";
  global.check_spendingsector1 = "";
  global.check_spendingsector2 = "";
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
  global.check_spendingsector14 = "";
  global.check_spendingsector15 = "";
  global.check_spendingsector16 = "";
  global.check_spendingsector17 = "";
  global.check_spendingsector18 = "";
  global.check_spendingsector19 = "";
  global.check_spendingsector20 = "";
  global.beneficiary_arrow = "upanddown";
  global.legalgrantingdate_arrow = "upanddown";
  global.subsidyamount_arrow = "upanddown";
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
  };
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
    .post("/updateresults", (req, res))
    .send({
      spending_sector_isfirst: "Yes",
      multiple_select: "Yes",
      check_subsidyobjective: "Research and development",
      subsidyobjective0: "Environmental protection",
      subsidyobjective1: "Culture/Heritage",
      subsidyobjective2: "Research and development",
      subsidyobjective3: "Employment",
      subsidyobjective4: "Energy efficiency",
      subsidyobjective5: "Infrastructure",
      subsidyobjective6: "Regional development",
      subsidyobjective7: "Rescue aid",
      subsidyobjective8: "Research and development",
      subsidyobjective9: "SME (Small/Medium-sized enterprise) support",
      subsidyobjective10: "Training",
      subsidyobjective11: "Environmental protection",
      subsidyobjective12: "Environmental protection",
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

test("Unit testing for update results route Test for GET call", async () => {
  const req = mockRequest();

  const res = {};
  request(app)
    .get("/updateresults", (req, res))
    .expect(200);
});
