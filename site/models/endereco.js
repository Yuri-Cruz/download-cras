'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Endereco.hasMany(models.Cliente,{
        foreignKey: 'fkCep'
      })
    }
  };
  Endereco.init({
    cep: {type: DataTypes.STRING, primaryKey: true},
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
    timestamps: false
  });
  return Endereco;
};