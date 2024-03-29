/******************************************/

/** *************import des module necessaire */
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/********************************** */

/************* recuperation du routeur express** */

let router = express.Router();

/******************************************* */

/******************** routage de la ressource auth */
router.post("/collection", (req, res) => {
  const { email, password } = req.body;
  /********verification des données recu */
  if (!email || !password) {
    return res.status(400).json({ message: "mauvaise email /password" });
  }
  User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({ message: "ce compte n'existe pas " });
      }
      //verification du mot de passe
      bcrypt
        .compare(password, user.password)
        .then((test) => {
          if (!test) {
            return res.status(401).json({ message: "mauvais mot de passe" });
          }
          //generation du token jwt
          const token = jwt.sign(
            {
              id: user.id,
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              role: user.role,
            },
            process.env.USER_JWT_SECRET,
            { expiresIn: process.env.JWT_DURING }
          );
          return res.status(200).json({ access_token: token });
          //jwt.sign(payload, phrase secret, duree)
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ message: "login process fail", error: err });
        });
    })
    .catch((err) =>
      res.status(500).json({ message: "database erreur", error: err })
    );
});

module.exports = router;
