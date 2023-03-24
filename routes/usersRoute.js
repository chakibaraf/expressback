 
/* import des modules nécesaire*/ 

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt')

/************************************************/ 

/** recuperation du router express ****/
const router = express.Router();


/************************************************************ */

/***  Routage de user***/


/************************************************************ */

/** pour afficher les utilisateurs  */
router.get('', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
  });



/************************************************************ */
  /******recuperer utilisateur par son id  */
  
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable." });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur." });
    }
  });

/************************************************************ */

/**creer un nouvel utilisateur  */
router.post('/', async (req, res) => {
    const { nom, email, password,prenom,codecas } = req.body;

     //verifier si l'utilisateur  existe .
     const userExist = await User.findOne({where:{email}});
    if (userExist ){
      return res.status(400).json({message:'un utilisateur existe deja '})
    }
    try {
    const hash = await bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT_ROUND))
    req.body.password = hash;  
    const newUsers = await User.create({ nom, email, password:hash ,prenom ,codecas});
      res.status(201).json(newUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
    }
  });


/************************************************************ */

/*** supprimer un nouvel utilisateur*/
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable." });
      } else {
        await user.destroy();
        res.status(204).json({ message: "Utilisateur supprimé avec succès." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur." });
    }
  });

  module.exports = router;