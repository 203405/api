// Dependencias
//import { Router } from "express";

//Inportaciones
import { getUsers } from "../../../model/users.js";
import { getData } from "./db.js";
import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt";

// Inicialización dependencias
//const router = Router();

var allow = ["http://localhost:3001"];
var corsop = function (req, callback) {
  var corsOpt;
  if (allow.indexOf(req.header("origin")) !== -1) {
    corsOpt = {
      origin: true,
    };
  } else {
    corsOpt = { origin: false };
  }
  callback(null, corsOpt);
};

const User = getData.sequelizeClient.define(
  "cat_users",
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
    tableName: "cat_users",
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

// Login
router.post("/login", function (req, res) {
  console.log(req.query);
  var username = req.query.username;
  res.send({
    username,
    token: "token",
    id_user: "id_user",
    success: "ok",
  });
});
//Get Sequelize
router.get("/all_users_orm", async function (req, res) {
  getUsers
    .findAll({
      attributes: ["id", "username"],
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});
//Delete Using Sequelize
router.delete("/delete_user_orm", async function (req, res) {
  let id = req.query.id;
  console.log("id:" + req.query.id);
  getUsers
    .destroy({
      where: {
        id: id,
      },
    })
    .then((r) => {
      _success(req, res, r, 200);
    })
    .catch((e) => {
      _success(req, res, e, 200);
    });
});

//update using Sequelize
router.put("/update_user_orm", async function (req, res) {
  let id = req.query.id;
  let newDatas = req.query;
  getUsers
    .findOne({ where: { id: id } })
    .then((r) => {
      r.update(newDatas);
      _success(req, res, r, 200);
      console.log("simon");
    })
    .catch((e) => {
      _success(req, res, e, 400);
      console.log("mal");
    });
});

//post Sequelize
router.post("/register_user_orm", async function (req, res) {
  getUsers
    .create({
      id: req.query.id,
      username: req.query.username,

    })
    .then((r) => {
      _success(req, res, r, 200);
      console.log("simon");
    })
    .catch((e) => {
      _success(req, res, e, 400);
    });
});

export const getUser = User;