'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Endereco,{
        foreignKey: 'fkCep'
      })
      Cliente.hasMany(models.Usuario,{
        foreignKey: 'fkCliente'
      })
      Cliente.hasMany(models.Parametros,{
        foreignKey: 'fkCliente'
      })
      Cliente.hasMany(models.Maquina,{
        foreignKey: 'fkCliente'
      })
    }
  };
  Cliente.init({
    cnpj: {type: DataTypes.STRING, primaryKey: true},
    nomeEmpresa: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    telefoneCelular: DataTypes.STRING,
    telefoneComercial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: false
  });
  return Cliente;
};