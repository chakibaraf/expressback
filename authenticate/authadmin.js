/******************************************/

/** *************import des module necessaire */
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')

/********************************** */

/************* recuperation du routeur express** */

let router = express.Router()

/******************************************* */

/******************** routage de la ressource auth */
router.post('/login',(req,res)=>{
   
    const { email, password } = req.body;
    /********verification des données recu */
    if(!email || !password ){
        return res.status(400).json({message:"mauvaise email /password"})
    }
    Admin.findOne({where :{email:email}, raw: true})
        .then(admin => {
            if(admin ==null){
                return res.status(401).json({message:"ce compte n'existe pas "})
            }
            //verification du mot de passe 
            bcrypt.compare(password,admin.password)
                .then(test =>{
                    if (!test){
                        return res.status(401).json({message:'mauvais mot de passe'})
                    }
                    //generation du token jwt
                    const token = jwt.sign({
                        id:admin.id,
                       nom:admin.nom,
                       prenom:admin.prenom,
                        email:admin.email,
                        role:admin.role,
                    },process.env.ADMIN_JWT_SECRET,{expiresIn: process.env.JWT_DURING} )

                    return res.json({acces_token:token,...admin})
                    //jwt.sign(payload, phrase secret, duree)
                })
                .catch(err => res.status(500).json({message:'login process fail',error:err}))
        })
        .catch(err =>  res.status(500).json({ message: "database erreur",error:err }))


})

module.exports = router 