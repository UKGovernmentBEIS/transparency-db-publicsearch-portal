// ***********************************************************
// Automated Unit testing scripts for spending sector route
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

test("Unit testing for spending sector route - Test for POST call", (done) => {
  global.spending_sector_isfirst = "Yes";
  const req = mockRequest(
    {},
    { check_subsidyobjective: "Research and development" }
  );

  const res = {};
  request(app)
    .post("/spendingsector", (req, res))
    .send({
      spending_sector_isfirst: "Yes",
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
    })
    .expect(200, done);
});

test("Unit testing for spending sector route Test for GET call", (done) => {
  const req = mockRequest({});

  const res = {};
  request(app)
    .get("/spendingsector", (req, res))
    .expect(200, done);
});
