const livros = [];

const criarLivro = (titulo, autor) => {
    const livro = { id: livros.length + 1, titulo, autor};
    livros.push(livro)
    return livro;
}

module.exports = { criarLivro };