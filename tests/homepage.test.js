// ***********************************************************
// Automated Unit testing scripts for home page route
// ***********************************************************

const path = require('node:path');
const request = require('supertest');
const express = require('express');
const router = require('../routes/homepage');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/', router);

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

test('Unit testing for home page route - Test for POST call', (done) => {
    const req = mockRequest();
    const res = {};
    request(app)
        .post('/', (req, res))
        .expect(200, done);
});

test('Unit testing for home page route Test for GET call', (done) => {
    const req = mockRequest();
    const res = {};
    request(app)
        .get('/', (req, res))
        .expect(200, done);
});
