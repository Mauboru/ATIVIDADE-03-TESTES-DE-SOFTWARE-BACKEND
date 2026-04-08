const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Emprestimo = require('./Emprestimo');

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
};
