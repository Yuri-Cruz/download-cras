'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Maquinas', {
      hostName: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sistemaOperacional: {
        type: Sequelize.STRING
      },
      processadorInfo: {
        type: Sequelize.STRING
      },
      qtdMemoria: {
        type: Sequelize.DOUBLE
      },
      qtdParticoes:{
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      fkCliente: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Clientes', key: 'cnpj'},
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Maquinas');
  }
};