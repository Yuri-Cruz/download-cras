'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parametros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parametros.belongsTo(models.Cliente,{
        foreignKey: 'fkCliente'
      })
    }
  };
  Parametros.init({
    cpu: DataTypes.DOUBLE,
    ram: DataTypes.DOUBLE,
    discos: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Parametros',
    timestamps: false
  });
  return Parametros;
};