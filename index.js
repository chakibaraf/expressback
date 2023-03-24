
/*********************************************************** */
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');

/*************************************************************/
/********************* variable d'environnement  ************************/
const API_URL = process.env.API_URL || 'http://localhost';
const API_PORT = process.env_API_PORT || 3001


/***************   initialisation de l'API  ***********/
const app = express();

//pour parser le contenu de mon body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

/*****************************************************/
/** import de la connexion a la base de donnée */
let DB = require('./db.config')

/***************************************************************/

/**import module de routage pour la bdd */
const user_utilisateurs = require('./routes/usersRoute')
const user_admin = require('./routes/adminRoute')


const auth_router = require('./authenticate/authadmin')
const auth_user = require('./authenticate/authUser')
//************* */ mise en place du Routage **********************************/
app.use('/', contactRoutes);

app.use('/users', user_utilisateurs);
app.use('/admins',user_admin)

/**--------------authentification ------------------ */
app.use('/auth',auth_router)
app.use('/auth',auth_user)
/************** demarrage server  avec base de donnée ******************************/
DB.authenticate()
    .then(() => console.log("Database connexion ok"))
    .then(() => {

        app.listen(API_PORT, () => {
            console.log(`Serveur lancé sur le port ${API_PORT}`);
        });
    }).catch(err => console.log("database error", err))






















/*const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

//pour parser le contenu de mon body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//pour utiliser mes elements static (image..)
//app.use(express.static('public'));



// fonction log request/*
/*
const logRequest =(res,req, next) =>{
    console.log(`> ${new Date().toLocaleTimeString()}`)

    next();
};
app.use(logRequest);



//mon get avec une reponse que j'envoi


app.get('/fichier/html',(req,res) => {
    console.log(__dirname,'dirname');
    console.log(path.join(__dirname,'views/page.html'));
    res.sendFile(path.join(__dirname,'views/page.html'));

}), 

// middlewear avec use  
 

app.use((req ,res , next )=> {
    if(req.method ==='POST' && !req.body.email ||!req.body.message ){
        const errorMessage = 'veuillez remplirtous les chanps requis'
        return  res.status(400).redirect(`/fichier/html?message=${encodeURIComponent(errorMessage)}` )
        
    };
    
    
    next();
});
//--------------------- methode POST--
//le facteur avec la config de l'adresse 
app.post('/fichier/html', async (req,res)=>{
   try {

       console.log(req.body) ;
    const transporter = nodemailer.createTransport({
        service:'gmail ',
        authMethod: 'PLAIN',
        auth:{
            user:'contact.test1520',
            pass:'jouhdmqndezmteqi',
        },
    });
    const mailOptions = {
        from: 'contact.test1520',

        /*tu met l'adresse qui recois
        to : 'araf.chakib.m@gmail.com',
        subject:'demande de contact',
        html: `<h1> nouveau message </h1>
        <p>email: ${req.body.email}</p>
        <p>message: ${req.body.message}</p>,
        <p>sujet : ${req.body.sujet}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.send('formulaire traite');
   } catch (error) {
    console.error(error);
    res.status(500).send('une erreur est survenue');

   }
});

//----------------configuration l'envoi du mail ------------

//---------------------------------------------------------
app.use((req,res) =>{
    res.status(404).send("page non trouve");
    console.log(req.params);

});
//-------------page 404 -------------------------

app.listen(port, () => {
    console.log(`Serveur lancé sur le port $(port)`);
});

*/