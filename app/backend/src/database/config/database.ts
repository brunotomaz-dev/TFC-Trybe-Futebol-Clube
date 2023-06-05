import 'dotenv/config';
import { Options } from 'sequelize';

const cfg: Options = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  dialect: 'mysql',
}

const config = {
  development: cfg,
  test: cfg,
  production: cfg
}

module.exports = config;
