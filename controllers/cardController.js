const mailService = require('../middleware/mailService');
const path = require('path');
require('dotenv').config();

exports.sendCard = async (req, res) => {
  try {
    const { articles ,email , message, quantity} = req.body;
    
    const mailOptions = {
      from: process.env.PRIVATE_USER,
      to: process.env.PRIVATE_EMAIL,
      subject: 'Demande de devis',
      html: `
        <html>
          <head>
            <style>
              /* Ajoutez ici votre propre style CSS pour personnaliser le devis */
            </style>
          </head>
          <body>
            <header>
              <h1>Demande de devis</h1>
              <p><strong>E-mail :</strong> ${email}</p>
              <p><strong>Message :</strong> ${message}</p>
             
            </header>
    
            <main>
              <table>
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Description</th>
                    
                  </tr>
                </thead>
                <tbody>
                  ${articles.map(article => `
                    <tr>
                    <p><strong>quantité:</strong> ${quantity}</p>
                      <td>${article.name}
                      <img src="cid:${article.image}" ${article.image} style="width:50px">
                      </td>
                      <td>${article.description}</td>
                     
                    </tr>
                  `).join('')}
                  <tr>
                    <td colspan="4"><strong>Total :</strong></td>
                    
                  </tr>
                </tbody>
              </table>
            </main>
    
            <footer>
              <p>Merci de nous avoir contacté. Nous vous recontacterons dans les plus brefs délais.</p>
            </footer>
          </body>
        </html>
      `,
      attachments: articles.map(article => ({
        filename: article.image,
        path: path.join(__dirname, '..', 'public', 'uploads', article.image),
        cid: article.image
      }))
  
      
    };
    await mailService.sendMail(mailOptions);
    res.send('mail envoye');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue' });
  }
};

