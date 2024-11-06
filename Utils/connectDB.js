import { Sequelize } from "sequelize";
import { dbConfig } from "./config.js";

//"host.docker.internal" this is host for docker on mac system 
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

export default sequelize;
