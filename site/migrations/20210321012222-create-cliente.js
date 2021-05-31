'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      cnpj: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nomeEmpresa: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      telefoneCelular: {
        type: Sequelize.STRING
      },
      telefoneComercial: {
        type: Sequelize.STRING
      },
      fkCep: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { model: 'Enderecos', key: 'cep'}
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clientes');
  }
};