const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/************************************/

/** ************** definition du modele user */
const Admin = DB.define('Admin',{
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        codeacces: {
            type:DataTypes.STRING(100),
            defaultValue:'',
            allowNull: false
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
        email:{
            type:DataTypes.STRING,
            validate:{
                isEmail: true //validation de donnée 
            }
        },
        password :{
            type:DataTypes.STRING(64),
            is: /^[0 9a f]{}$/i //ici contrainte
        }
},{paranoide:true})   //pour faire du soft delete

module.exports =  Admin