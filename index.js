const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const Routes = require("./routes");

// initialize the express app
const app = express();

// ENV variables
const API_URL = process.env.API_URL || "http://localhost";
const API_PORT = process.env.API_PORT || 3006;

/***************   initialisation de l'API  ***********/

//pour parser le contenu de mon body
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/*****************************************************/
/** import de la connexion a la base de donnée */
let DB = require("./db.config");

/***************************************************************/

/**import module de routage pour la bdd */
const auth_router = require("./authenticate/authadmin");
const auth_user = require("./authenticate/authUser");
//************* */ mise en place du Routage **********************************/
app.use(Routes);

/**--------------authentification ------------------ */
app.use("/auth", auth_router);
app.use("/auth", auth_user);
/************** demarrage server  avec base de donnée ******************************/
DB.authenticate()
  .then(() => console.log("Database connexion ok"))
  .then(() => {
    app.listen(API_PORT, () => {
      console.log(`Serveur lancé sur le port ${API_PORT}`);
    });
  })
  .catch((err) => console.log("database error", err));