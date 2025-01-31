const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World, Izadora HERE!');
});

test('GET / should return Hello World, Izadora HERE!', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World, Izadora HERE!');
});
