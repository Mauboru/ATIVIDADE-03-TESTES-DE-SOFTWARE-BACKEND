const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const atualizarLivro = async (titulo, autor, id) => {
  const livro = await Livro.findByPk(id);
  await livro.update({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
    disponivel: livro.disponivel
  };
};

const listarLivrosDisponiveis = async () => {
  const livros = await Livro.findAll({ where: { disponivel: true }});
  return livros;
};

const listarLivros = async () => {
  const livros = await Livro.findAll();
  return livros;
};

const deletarLivro = async (id) => {
  await Livro.destroy({where: { id }});
}

const pegarPorId = async (id) => {
  const livro = await Livro.findByPk(id);
  return livro;
}

module.exports = { criarLivro, listarLivros, deletarLivro, pegarPorId, atualizarLivro, listarLivrosDisponiveis };