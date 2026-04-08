const { criarEmprestimo, listarEmprestimos, pegarPorId, pegarPorIdUsuario, atualizarEmprestimo, deletarEmprestimo } = require('../services/emprestimoService');

const criar = async (req, res) => {
    try {
        const { usuario_id, livro_id, data_devolucao_prevista } = req.body;

        if (!usuario_id || !livro_id || !data_devolucao_prevista) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const emprestimo = await criarEmprestimo(usuario_id, livro_id, data_devolucao_prevista);
        res.status(201).json(emprestimo);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listar = async (req, res) => {
    const emprestimos = await listarEmprestimos();
    res.status(200).json(emprestimos);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

    const emprestimo = await pegarPorId(id);
    if (!emprestimo) return res.status(404).json({ message: "Esse emprestimo não existe!" });

    res.status(200).json(emprestimo);
}

const buscarPorUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    if (!usuario_id) return res.status(400).json({ erro: 'id de usuario é obrigatório' });

    const emprestimo = await pegarPorIdUsuario(usuario_id);
    if (!emprestimo) return res.status(404).json({ message: "Esse emprestimo não existe para este usuario!" });

    res.status(200).json(emprestimo);
}

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, livro_id, data_devolucao_prevista, data_devolucao } = req.body;
        if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

        const emprestimo = await atualizarEmprestimo(usuario_id, livro_id, data_devolucao_prevista, data_devolucao, id);
        res.status(200).json(emprestimo);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

const deletar = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    
    const apagado = await deletarEmprestimo(id);
    if (!apagado) return res.status(404).json({ message: "Esse emprestimo não existe!" });

    res.status(204).send();
}

module.exports = { criar, listar, deletar, buscarPorId, buscarPorUsuario, atualizar };