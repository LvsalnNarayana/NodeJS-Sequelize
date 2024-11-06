// import dotenv from "dotenv";
import 'dotenv/config'
import express, { json } from "express";
import { StatusCodes } from "http-status-codes";
import sequelize from "./Utils/connectDB.js";
import userRouter from "./Router/User.router.js";
import testConnection from "./Utils/testDBConnection.js";

const app = express();
const port = process.env.PORT || 3000;

testConnection(sequelize);

// Middleware
app.use(json());

// Basic endpoints
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the node js & postgres API with sequelize ORM",
  });
});

// Example endpoint using Sequelize (assuming you have a 'User' model)
app.use("/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
  });
});

// Catch-all route for undefined routes
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
