const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');

module.exports = {
  sequelize,
  Livro,
  Usuario,
};
