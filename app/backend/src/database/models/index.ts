import { Sequelize } from 'sequelize';
// import * as config from '../config/database';
const config = require("../config/database")["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, config);


export default sequelize;
