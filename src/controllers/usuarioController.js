const { criarUsuario, listarUsuarios, pegarPorId, atualizarUsuario, deletarUsuario } = require('../services/usuarioService');
const bcrypt = require('bcrypt');

const criar = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ erro: 'todos os campos são obrigatórios' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await criarUsuario(nome, email, senhaHash, tipo);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

const listar = async (req, res) => {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    const usuario = await pegarPorId(id);
    res.status(200).json(usuario);
}

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;
        if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

        const usuario = await atualizarUsuario(nome, email, senha, tipo, id);
        res.status(200).json(usuario);
    } catch (error) {
        const status = error.message === 'Usuário não encontrado' ? 404 : 400;
        res.status(status).json({ erro: error.message });
    }
}

const deletar = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    await deletarUsuario(id);
    res.status(204).send();
}

module.exports = { criar, listar, buscarPorId, atualizar, deletar };