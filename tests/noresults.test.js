// ***********************************************************
// Automated Unit testing scripts for no results route
// ***********************************************************

const path = require('node:path');
const request = require('supertest');
const express = require('express');
const router = require('../routes/noresults');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/', router);

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

test('Unit testing for no results route - Test for POST call', (done) => {
    const req = mockRequest();
    const res = {};
    request(app)
        .post('/', (req, res))
        .expect(200, done);
});

test('Unit testing for no results route Test for GET call', (done) => {
    const req = mockRequest();
    const res = {};
    const response = request(app)
        .get('/', (req, res))
        .expect(200, done);
});
