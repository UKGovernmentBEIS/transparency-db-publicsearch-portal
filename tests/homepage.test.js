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

test('Unit testing for home page route - Test for POST call', async () => {
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
        '<title>GOV.UK - Public user search page</title>',
    );
});

test('Unit testing for home page route Test for GET call', async () => {
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
        '<title>GOV.UK - Public user search page</title>',
    );
});
