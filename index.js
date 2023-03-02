const express = require('express');
const path = require('path');

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = 3000;

//pour parser le contenu de mon body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.use('/', contactRoutes);

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});



















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