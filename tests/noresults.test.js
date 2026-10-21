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

test('Unit testing for no results route - Test for POST call', async () => {
    const req = mockRequest();
    const res = {};
    const response = await request(app)
        .post('/', (req, res))
        .expect(200);

    expect(response).toBeDefined();
    expect(response).not.toBeNull();
    expect(response.text).toBeDefined();
    expect(response.text).not.toBeNull();
    expect(response.text).toContain(
        '<title>GOV.UK - Public user search no result page</title>',
    );
});

test('Unit testing for no results route Test for GET call', async () => {
    const req = mockRequest();
    const res = {};
    const response = await request(app)
        .get('/', (req, res))
        .expect(200);

    expect(response).toBeDefined();
    expect(response).not.toBeNull();
    expect(response.text).toBeDefined();
    expect(response.text).not.toBeNull();
    expect(response.text).toContain(
        '<title>GOV.UK - Public user search no result page</title>',
    );
});
