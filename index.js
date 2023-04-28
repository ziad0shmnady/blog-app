const express = require("express");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());
dotenv.config();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Port is connected ${process.env.PORT}`);
});
