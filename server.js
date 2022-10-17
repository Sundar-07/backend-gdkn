const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//api routing

const customerRoutes = require("./routers/CustomerRouter");

app.use("/api/v1/customers", customerRoutes);

//mongodb connection
mongoose.connect(process.env.DATABASE_URL, () => {
  try {
    console.log(`Database is Connected`);
  } catch (error) {
    console.log(`Database conection error ${error}`);
  }
});

//server connection
app.listen(PORT, () => {
  try {
    console.log(`Server is running on ${PORT} port`);
  } catch (error) {
    console.log(`Error from server port: ${PORT}`);
  }
});

// console.log("Hello from server");
