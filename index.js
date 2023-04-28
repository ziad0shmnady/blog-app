const express = require("express");
const dotenv = require("dotenv");
const app = express();
const sequelize = require("./db/connection");
const User = require("./model/userModel");
const Post = require("./model/postModel");
const relationships = require("./db/relation");
app.use(express.json());
dotenv.config();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Port is connected ${process.env.PORT}`);
});
