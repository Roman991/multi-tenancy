'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'TenantsConfigs',
      [
        {
          id: 1,
          tenantId: 1,
          configName: 'royalShipping',
          configValue: '{"user":123,"pass":123}',
        },
        {
          id: 2,
          tenantId: 2,
          configName: 'royalShipping',
          configValue: '{"user":123,"pass":123}',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TenantsConfigs', null, {});
  },
};
