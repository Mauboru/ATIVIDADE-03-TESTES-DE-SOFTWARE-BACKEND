const { criarLivro } = require('../services/livroService');

const criar = (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = criarLivro(titulo, autor);
    res.status(201).json(livro
        
    );
}

module.exports = { criar };