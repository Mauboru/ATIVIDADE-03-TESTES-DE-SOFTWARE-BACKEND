const { criarMulta, listarMultas, pegarPorId, pegarPorIdEmprestimo, atualizarMulta, deletarMulta, quitarMulta } = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { emprestimo_id, quitado, tipo, valor, obs } = req.body;
        if (!emprestimo_id || !tipo || !valor) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

        const multa = await criarMulta(emprestimo_id, quitado, tipo, valor, obs);
        res.status(201).json(multa);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listar = async (req, res) => {
    const multas = await listarMultas();
    res.status(200).json(multas);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

    const multa = await pegarPorId(id);
    if (!multa) return res.status(404).json({ message: "Essa multa não existe!" });

    res.status(200).json(multa);
}

const buscarPorEmprestimo = async (req, res) => {
    const { emprestimo_id } = req.params;
    if (!emprestimo_id) return res.status(400).json({ erro: 'id de emprestimo é obrigatório' });

    const multa = await pegarPorIdEmprestimo(emprestimo_id);
    if (!multa) return res.status(404).json({ message: "Esse emprestimo não existe para este multa!" });

    res.status(200).json(multa);
}

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { emprestimo_id, quitado, tipo, valor, obs } = req.body;
        if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

        const multas = await atualizarMulta(emprestimo_id, quitado, tipo, valor, obs, id);
        res.status(201).json(multas);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

const quitar = async (req, res) => {
    try {
        const { id } = req.params;
        const quitado = await quitarMulta(id);
        res.status(201).json(quitado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

const deletar = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    
    const apagado = await deletarMulta(id);
    if (!apagado) return res.status(404).json({ message: "Essa multa não existe!" });

    res.status(204).send();
}

module.exports = { criar, listar, deletar, buscarPorId, buscarPorEmprestimo, atualizar, quitar };