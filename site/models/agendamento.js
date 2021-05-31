'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agendamento.belongsTo(models.Maquina,({
        foreignKey: 'fkMaquina'
      }))
    }
  };
  Agendamento.init({
    dataAgendamento: DataTypes.STRING,
    motivoAgendamento: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Agendamento',
    timestamps: false
  });
  return Agendamento;
};