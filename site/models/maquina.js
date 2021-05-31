'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maquina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Maquina.belongsTo(models.Cliente,{
        foreignKey: 'fkCliente'
      })
      Maquina.hasMany(models.Log,({
        foreignKey: 'fkMaquina'
      }))
      Maquina.hasMany(models.Agendamento,({
        foreignKey: 'fkMaquina'
      }))
      Maquina.hasMany(models.Disco,({
        foreignKey: 'fkMaquina'
      }))
    }
  };
  Maquina.init({
    hostName: {type: DataTypes.STRING, primaryKey: true},
    sistemaOperacional: DataTypes.STRING,
    processadorInfo: DataTypes.STRING,
    qtdMemoria: DataTypes.STRING,
    qtdParticoes: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Maquina',
    timestamps: false
  });
  return Maquina;
};