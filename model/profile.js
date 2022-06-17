import { getData } from "./db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const Profile = getData.sequelizeClient.define(
  "cat_profiles",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "This username is already taken.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: DataTypes.STRING,
  },
  {
    tableName: "cat_profiles",
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, 10)
              : "";
        }
      },
    },
  }
);

export const getProfile = Profile;