import { DataTypes } from "sequelize";
import sequelize from "../Utils/connectDB.js";

const User = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // isAlphanumeric: true,
        len: {
          args: [3, 20],
          msg: "Username must be between 3 and 20 characters",
        },
        notNull: {
          msg: "Username is required",
        },
        notEmpty: {
          msg: "Username cannot be empty",
        },
        notContains: {
          args: [" "],
          msg: "Username cannot contain spaces",
        },
        notContains: {
          args: ["@"],
          msg: "Username cannot contain @",
        },
      },
      set(value) {
        this.setDataValue("username", value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        notContains: {
          args: [" "],
          msg: "Email cannot contain spaces",
        },
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
        notContains: {
          args: [" "],
          msg: "Password cannot contain spaces",
        },
        len: {
          args: [8, 20],
          msg: "Password must be between 8 and 20 characters",
        },
        // is: {
        //   args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        //   msg: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        // },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["user", "admin"]],
          msg: "Role must be either user or admin",
        },
        notNull: {
          msg: "Role is required",
        },
        notEmpty: {
          msg: "Role cannot be empty",
        },
      },
      set(value) {
        this.setDataValue("role", value.toUpperCase());
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["username"] }],
  }
);

export default User;
