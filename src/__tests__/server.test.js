const request = require('supertest');
const server = require('../server');
const agent = request(server);

describe('Server', () => {
  test('create valid', async () => {
    const response = await agent.post('/todos').send({text: 'Test'});
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.text)).toMatchSnapshot();
    await agent.get('/reset');
  });

  test('create invalid', async () => {
    const response = await agent.post('/todos').send({text: ''});
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('get all', async () => {
    await agent.get('/reset');
    const response = await agent.get('/todos');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('get existing', async () => {
    const response = await agent.get('/todos/1');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('get not existing ', async () => {
    const response = await agent.get('/todos/123');
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('update valid', async () => {
    const response = await agent.put('/todos/1').send({text: 'Test'});
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('update invalid', async () => {
    const response = await agent.put('/todos/1').send({text: ''});
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toMatchSnapshot();
  });

  test('delete', async () => {
    await agent.delete('/todos/1');
    const response = await agent.get('/todos');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toMatchSnapshot();
    await agent.get('/reset');
  });
});
