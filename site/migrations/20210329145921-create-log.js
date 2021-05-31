'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Logs', {
      momentoCaptura: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      usoCpu: {
        type: Sequelize.DOUBLE
      },
      usoMemoria: {
        type: Sequelize.DOUBLE
      },
      tempoUso: {
        type: Sequelize.TIME
      },fkMaquina: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Maquinas', key: 'hostName'},
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Logs');
  }
};