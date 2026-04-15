const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Emprestimo = require('./Emprestimo');

const Multas = sequelize.define('Multas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    emprestimo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tipo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    obs: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
  tableName: 'multas',
  timestamps: true,
  underscored: false,
});

Multas.belongsTo(Emprestimo, { foreignKey: 'emprestimo_id' });
module.exports = Multas;