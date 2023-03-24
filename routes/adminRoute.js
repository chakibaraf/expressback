
/* import des modules nécessaire*/ 

const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt')


/************************************************/ 

/** recuperation du router express ****/
const router = express.Router();


/************************************************************ */

/***  Routage de administrateur***/


/************************************************************ */

/** pour afficher les administrateurs  */
router.get('', async (req, res) => {
    try {
      const admins = await Admin.findAll();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
  });



/************************************************************ */
  /******recuperer administrateur par son id  */
  
router.get('/:id', async (req, res) => {
    const adminId = req.params.id;
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        res.status(404).json({ message: "Utilisateur introuvable." });
      } else {
        res.status(200).json(admin);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur." });
    }
  });

/************************************************************ */

/**creer un nouvel administrateur  */
router.post('/', async (req, res) => {
    const { nom, email, password,prenom ,codeacces } = req.body;
   

    
    //verifier si l'admin existe .
    const adminExist = await Admin.findOne({where:{email}});
    if (adminExist ){
      return res.status(400).json({message:'un administrateur existe deja '})
    }
        //permet de mettre un code acces pour la creation de l'admin
        if (codeacces !== process.env.ACCESS_CODE) {
          return res.status(401).json({message:'code invalide '})
        }
        console.log(codeacces);
         
    
    try {
      
   const hash = await bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT_ROUND))
      
      req.body.password = hash ;

      const newAdmin = await Admin.create({ nom, email, password:hash,prenom ,codeacces})
      res.status(201).json(newAdmin);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
    }
  });


/************************************************************ */

/*** supprimer un nouvel avec id administrateur*/
router.delete('/:id', async (req, res) => {
    
    try {
      const admin = await Admin.findByPk(admin);
      if (!admin) {
        res.status(404).json({ message: "Utilisateur introuvable." });
      } else {
        await admin.destroy();
        res.status(204).json({ message: "Utilisateur supprimé avec succès." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur." });
    }
  });

  

  /*** supprimer  tous les  administrateur et vider la table avec destroy*/
router.delete('/', async (req, res) => {
  try {
    await Admin.destroy({
      where: {},
      truncate: true
    });
    res.status(204).json({ message: "Tous les administrateurs ont été supprimés avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression des administrateurs." });
  }
});
  module.exports = router;