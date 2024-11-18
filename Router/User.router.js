import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersByUsername,
  updateUser,
} from "../Controller/User.controller.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import customError from "../Utils/customError.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { username, page, pageSize } = req.query;
      if (username) {
        const users = await getUsersByUsername({ username, page, pageSize });
        res.status(StatusCodes.OK).json(users);
      } else {
        const users = await getAllUsers({ page, pageSize });
        res.status(StatusCodes.OK).json(users);
      }
    } catch (error) {
      throw customError({
        message: error.message,
        status: error.status,
        name: error.name,
      });
    }
  })
);
userRouter.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw customError({
          message: "userId is required",
          status: StatusCodes.BAD_REQUEST,
          name: "userId is required",
        });
      }
      const user = await getUserById(userId);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      throw customError({
        message: error.message,
        status: error.status,
        name: error.name,
      });
    }
  })
);
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        throw customError({
          message: "All fields are required",
          status: StatusCodes.BAD_REQUEST,
          name: "All fields are required",
        });
      }
      const user = await createUser({ username, email, password });
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      throw customError({
        message: error.message,
        status: error.status,
        name: error.name,
      });
    }
  })
);

userRouter.put(
  "/:userId",
  asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, email, password } = req.body;
      if (!userId) {
        throw customError({
          message: "userId is required",
          status: StatusCodes.BAD_REQUEST,
          name: "userId is required",
        });
      }
      const user = await updateUser({ id: userId, username, email, password });
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      throw customError({
        message: error.message,
        status: error.status,
        name: error.name,
      });
    }
  })
);
userRouter.delete(
  "/:userId",
  asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw customError({
          message: "userId is required",
          status: StatusCodes.BAD_REQUEST,
          name: "userId is required",
        });
      }
      const user = await deleteUser(userId);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      throw customError({
        message: error.message,
        status: error.status,
        name: error.name,
      });
    }
  })
);
export default userRouter;
