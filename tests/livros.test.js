const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe('Rotas de API - ATV03', ()=> {
  test('GET /livros lista os livros', async () => {
    const res = await axios.get(`${api}/livros`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });
  
  test('GET /livros/:id busca um livro por id', async () => {
    const id = 103;
    const res = await axios.get(`${api}/livros/${id}`);
    expect(res.status).toBe(200);
  });

  test('POST /livros cria um livro', async () => {
    const res = await axios.post(`${api}/livros`, { 
      titulo: 'Clean Code', 
      autor: 'Martin Code' 
    });
    expect(res.status).toBe(201);
    expect(res.data.titulo).toBe('Clean Code');

    await axios.delete(`${api}/livros/${res.data.id}`);
  });

  test('PUT /livros/:id atualiza um livro', async () => {
    const novoTitulo = 'Livo Novo'
    const novoAutor = 'Josue'
    const id = 326;
    const res = await axios.put(`${api}/livros/${id}`, { 
      titulo: novoTitulo, 
      autor: novoAutor
    });
    
    expect(res.status).toBe(201);
    expect(res.data.titulo).toBe(novoTitulo);
  });

  test('DELETE /livros/:id deleta um livro', async () => {
    const livro = await axios.post(`${api}/livros`, { titulo: 'Clean Code', autor: 'Martin Code' });
    const res = await axios.delete(`${api}/livros/${livro.data.id}`);
    expect(res.status).toBe(204);
  });

  test('GET /livros/disponiveis retorna os livros disponiveis', async () => {
    const res = await axios.get(`${api}/livros/disponiveis`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });
});