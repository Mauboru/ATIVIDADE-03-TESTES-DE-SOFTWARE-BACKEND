const { criarLivro, listarLivros, pegarPorId, deletarLivro, atualizarLivro, listarLivrosDisponiveis } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const listar = async (req, res) => {
    const livros = await listarLivros();
    res.status(200).json(livros);
}

const listarDisponiveis = async (req, res) => {
    const livros = await listarLivrosDisponiveis();
    res.status(200).json(livros);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    const livros = await pegarPorId(id);
    res.status(200).json(livros);
}

const atualizar = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor } = req.body;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    const livro = await atualizarLivro(titulo, autor, id);
    res.status(201).json(livro);
}

const deletar = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    await deletarLivro(id);
    res.status(204).send();
}

module.exports = { criar, listar, deletar, buscarPorId, atualizar, listarDisponiveis };