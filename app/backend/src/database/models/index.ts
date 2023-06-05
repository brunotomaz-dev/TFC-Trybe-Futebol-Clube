import "dotenv/config";
import { Sequelize } from 'sequelize';
// import * as config from '../config/database';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '../config/database.js')[env];

// const sequelize = new Sequelize(config)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize;
