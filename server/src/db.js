import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blog", "postgres", "mypostgres", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
