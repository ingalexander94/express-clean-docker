import { Sequelize, Options } from "sequelize";
import { envs } from "../../config";
const configDB: Options = {
  dialect: "mariadb",
  host: envs.HOST_DB,
  port: envs.PORT_DB,
  username: envs.USERNAME_DB,
  password: envs.PASSWORD_DB,
  database: envs.NAME_DB,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
};

export const mariadb = new Sequelize(configDB);
