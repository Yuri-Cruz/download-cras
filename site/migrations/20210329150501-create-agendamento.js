'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataAgendamento: {
        type: Sequelize.STRING
      },
      motivoAgendamento: {
        type: Sequelize.TEXT
      },fkMaquina: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Maquinas', key: 'hostName'},
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Agendamentos');
  }
};