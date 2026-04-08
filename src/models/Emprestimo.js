const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  livro_id: {
    type: DataTypes.INTEGER,
    allowNull: false

  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_devolucao_prevista: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_devolucao: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'emprestimos',
  timestamps: false,
  underscored: false,
});

Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Emprestimo;