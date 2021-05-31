'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      momentoCaptura: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      pontoDeMontagem: {
        type: Sequelize.STRING
      },
      espacoTotal: {
        type: Sequelize.DOUBLE
      },
      espacoDisponivel: {
        type: Sequelize.DOUBLE
      },fkMaquina: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Maquinas', key: 'hostName'},
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Discos');
  }
};