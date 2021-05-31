'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      fkCliente: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Clientes', key: 'cnpj'},
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios');
  }
};