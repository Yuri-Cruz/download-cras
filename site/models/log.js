'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Log.belongsTo(models.Maquina,({
        foreignKey: 'fkMaquina'
      }))
    }
  };
  Log.init({
    momentoCaptura:{type: DataTypes.DATE, primaryKey: true},
    usoCpu: DataTypes.STRING,
    usoMemoria: DataTypes.STRING,
    tempoUso: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
    timestamps: false
  });
  return Log;
};