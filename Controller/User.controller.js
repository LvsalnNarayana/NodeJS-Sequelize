import { DataTypes, Op } from "sequelize";
import User from "../Model/User.model.js";
import { StatusCodes } from "http-status-codes";
import customError from "../Utils/customError.js";

export const getAllUsers = async ({ pageSize = 10, page = 0 }) => {
  try {
    const users = await User.findAll({
      limit: pageSize,
      offset: page * pageSize,
    });
    return { data: users, pagination: { currentPage: page, size: pageSize } };
  } catch (error) {
    throw customError({
      message: "Error retrieving users",
      status: StatusCodes.BAD_REQUEST,
      name: "retrievalError",
    });
  }
};

export const getUsersByUsername = async ({
  username = null,
  pageSize = 10,
  page = 0,
}) => {
  try {
    const total = await User.count({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });

    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
      limit: pageSize,
      offset: page * pageSize,
    });

    return {
      data: users,
      pagination: {
        page,
        size: pageSize,
        total,
      },
    };
  } catch (error) {
    throw customError({
      message: error.message || "Error retrieving users",
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      name: error.name || "retrievalError",
    });
  }
};

export const getUserById = async (userId) => {
  try {
    if (userId === null || userId === undefined) {
      throw customError({
        message: "User ID is required",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      throw customError({
        message: "User ID is not valid",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw customError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        name: "notFoundError",
      });
    }
    return user;
  } catch (error) {
    throw customError({
      message: error.message || "Error retrieving user",
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      name: error.name || "retrievalError",
    });
  }
};
export const createUser = (userData) => {
  try {
    User.beforeSave("test_validation", () => {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!usernameRegex.test(userData?.username)) {
        throw customError({
          message: "Username is not valid",
          status: StatusCodes.BAD_REQUEST,
          name: "validationError",
        });
      }
      if (!emailRegex.test(userData?.email)) {
        throw customError({
          message: "Email is not valid",
          status: StatusCodes.BAD_REQUEST,
          name: "validationError",
        });
      }
      if (!passwordRegex.test(userData?.password)) {
        throw customError({
          message: "Password is not valid",
          status: StatusCodes.BAD_REQUEST,
          name: "validationError",
        });
      }
      if (condition) {
      }
    });
    const user = User.create(userData);
    return user;
  } catch (error) {
    throw customError({
      message: "Error creating user",
      status: StatusCodes.BAD_REQUEST,
      name: "creationError",
    });
  }
};
export const updateUser = async (updatedUserData) => {
  try {
    if (updatedUserData?.id === null || updatedUserData?.id === undefined) {
      throw customError({
        message: "User ID is required",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(updatedUserData?.id)) {
      throw customError({
        message: "User ID is not valid",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    const user = await User.update(updatedUserData, {
      where: {
        id: updatedUserData.id,
      },
    });
    if (user[0] === 1) {
      const updatedUser = await getUserById(updatedUserData?.id);
      return updatedUser;
    } else {
      throw customError({
        message: "Error updating user",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        name: "updationError",
      });
    }
  } catch (error) {
    throw customError({
      message: error.message || "Error updating user",
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      name: error.name || "updationError",
    });
  }
};
export const deleteUser = (userId) => {
  try {
    if (userId === null || userId === undefined) {
      throw customError({
        message: "User ID is required",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    if (typeof userId !== DataTypes.UUID) {
      throw customError({
        message: "User ID is not valid",
        status: StatusCodes.BAD_REQUEST,
        name: "validationError",
      });
    }
    const user = User.destroy({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    throw customError({
      message: "Error deleting user",
      status: StatusCodes.BAD_REQUEST,
      name: "deletionError",
    });
  }
};
