import * as config from '../config/database';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config)
export default sequelize;