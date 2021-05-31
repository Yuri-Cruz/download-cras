'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parametros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpu: {
        type: Sequelize.DOUBLE
      },
      ram: {
        type: Sequelize.DOUBLE
      },
      discos: {
        type: Sequelize.DOUBLE
      },
      fkCliente: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: { model: 'Clientes', key: 'cnpj'},
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parametros');
  }
};