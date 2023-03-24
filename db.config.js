/**** import module *****/
const {Sequelize} = require("sequelize");

/** connexion a la base de donnée * */

let sequelize = new Sequelize(
    process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect:'mysql',
        logging:false
    }
)
/*******************************************/
/* synchronisation des modeles */

    sequelize.sync(err => {
        console.log("database sync Error",err);
    })
//**sequelize.sync() */
module.exports = sequelize