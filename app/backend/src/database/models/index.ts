import "dotenv/config";
import { Sequelize } from 'sequelize';
// import * as config from '../config/database';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '../config/database.ts')[env];

// const sequelize = new Sequelize(config)

const sequelize = new Sequelize(config.database, config.username, config.password, config);


export default sequelize;
