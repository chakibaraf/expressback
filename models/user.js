/* import des modules necessaires ***/ 
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/************************************/

/** ************** definition du modele user */
const User = DB.define('User',{
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user", // La valeur par défaut du rôle est "user".
          },
        nom:{
            type:DataTypes.STRING(100),
            defaultValue:'',
            allowNull: false
        },
        prenom:{
            type:DataTypes.STRING(100),
            defaultValue:'',
            allowNull: false
        },
        codecas:{
            type:DataTypes.STRING(100),
            defaultValue:'',
            allowNull: false
        },
        email:{
            type:DataTypes.STRING,
            validate:{
                isEmail: true //validation de donnée 
            }
        },
        
        password :{
            type:DataTypes.STRING(64),
            is: /^[0-9a-fA-F]{64}$/ //ici contrainte
        }
},{paranoide:true})   //pour faire du soft delete

module.exports =  User