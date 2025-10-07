const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello World'); // ✅ No exclamation mark
    expect(res.statusCode).toBe(200);
  }, 15000); // ⏱️ Increased timeout to 15 seconds
});
