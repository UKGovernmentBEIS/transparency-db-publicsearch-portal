// ***********************************************************
// Automated Unit testing scripts for search results measure route
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

test("Unit testing for search results measure route Test for GET call", async() => {
  const req = mockRequest();
  axios.get.mockResolvedValue({
    status: "success",
    code: 200,
    data: [],
  });
  const res = {};
  request(app)
    .get("/searchresultsmeasureroute", (req, res))
    .query({ page: "SC10029" })
    .expect(200);
});
