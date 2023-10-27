import { Logger } from '@nestjs/common';
import { QueryTypes, Sequelize } from 'sequelize';

export const load = async (): Promise<any> => {
  const logger = new Logger('CONFIG');
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.PSQL_URL,
    port: Number(process.env.PSQL_PORT),
    username: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DB,
    logging: false,
  });

  try {
    const configRes = await sequelize.query(
      `SELECT * 
      FROM "TenantsConfigs"
      WHERE "configName" = 'royalShipping'`,
      { type: QueryTypes.SELECT },
    );

    const config = configRes.reduce((acc, el: any) => {
      const elements = el?.value;
      return { ...acc, ...elements };
    }, {});
    logger.debug('LOAD-CONFIG - Success ' + config);
    return config;
  } catch (err) {
    logger.error('LOAD-CONFIG', err);
  }
};
