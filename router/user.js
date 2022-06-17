import { Router } from "express";
import { getUser } from '../model/users.js'


const router = Router();

router.get("/check", function (req, res) {
  res.send({
    success: "exito funciona",
  });
});

router.get("/all_users_orm", async function (reg, res) {
  getUser
    .findAll({
      attributes: ["name", "lastName", "email", "password", "phone_number"],
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/insert", async function (req, res) {
  getUser
    .create(
      {
        name: req.query.name,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        phone_number: req.query.phone_number,
      },
      { fields: ["name", "lastName", "email", "password", "phone_number"] }
    )
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;