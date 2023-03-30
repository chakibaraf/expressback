
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const userToken = req.headers.authorization?.split("userToken")[1];

  if (!userToken) {
    // Si le token n'est pas fourni, retourner une erreur 401 (Unauthorized)
    return res.status(401).json({ message: "Token d'authentification manquant." });
  }

  try {
    // Vérifier le token avec la clé secrète utilisée lors de la génération du token
    const decodedToken = jwt.verify(userToken, process.env.USER_JWT_SECRET);

    // Vérifier que le rôle de l'utilisateur est bien administrateur
    if (decodedToken.role !== 'user') {
      return res.status(401).json({ message: "Vous n'êtes pas autorisé à accéder à cette ressource." });
    }

    // Ajouter le token décodé à la requête pour une utilisation ultérieure
    req.decodedToken = decodedToken;

    // Appeler la fonction next pour passer à la prochaine étape du traitement de la requête
    next();

  } catch (error) {
    // En cas d'erreur de vérification du token, retourner une erreur 401 (Unauthorized)
    console.error(error);
    return res.status(401).json({ message: "Token d'authentification invalide." });
  }
}

module.exports = { userAuth };