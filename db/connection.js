const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(`postgres://postgres:1234@localhost:5432/Blog`);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize
  .sync({ logging: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });

module.exports = sequelize;
