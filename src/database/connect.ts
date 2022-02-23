import { Dialect, Sequelize } from "sequelize";
import {
  dbName,
  dbPassword,
  dbUsername,
  nodeEnv,
  dbDialect,
  dbHost
} from "../config";
import logger from "../utils/logger";

let sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect as Dialect,
  port: 5432
});
if (nodeEnv === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL as string);
}

const connectToDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database due to: ", error);
  }
};
export { sequelize, connectToDB };
