'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          tenantId: 1,
          firstName: 'Roman',
        },
        {
          id: 2,
          tenantId: 1,
          firstName: 'Joe',
        },
        {
          id: 3,
          tenantId: 2,
          firstName: 'Daniel',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
