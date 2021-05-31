'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disco.belongsTo(models.Maquina,({
        foreignKey: 'fkMaquina'
      }))
    }
  };
  Disco.init({
    momentoCaptura: {type: DataTypes.DATE, primaryKey: true},
    pontoDeMontagem: DataTypes.STRING,
    espacoTotal: DataTypes.DOUBLE,
    espacoDisponivel: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Disco',
    timestamps: false
  });
  return Disco;
};