'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tenants',
      [
        {
          id: 1,
          name: 'Tenant 1',
        },
        {
          id: 2,
          name: 'Tenant 2',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tenants', null, {});
  },
};
