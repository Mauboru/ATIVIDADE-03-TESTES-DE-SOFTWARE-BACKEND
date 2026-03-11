const request = require('supertest');
const app = require('../src/app');

test('POST /livros cria um livro', async () => {
    const res = await request(app)
        .post('/livros')
        .send({ titulo: 'Clean Code', autor: 'Martin Code'});
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Clean Code');
});