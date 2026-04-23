const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const orderRoutes = require();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user/orders", orderRoutes);

module.exports = app;
