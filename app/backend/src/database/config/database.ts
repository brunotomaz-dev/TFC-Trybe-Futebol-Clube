import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
}

module.exports = {
  development: config,
  test: config,
  production: config,
};
