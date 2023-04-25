const { DataTypes } = require("sequelize");
const DB = require("../db.config");

/************************************/

/** ************** definition du modele user */
const Article = DB.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  { paranoide: true }
); //pour faire du soft delete

module.exports = Article;
