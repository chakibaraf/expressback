const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

/**
 * Middleware pour vérifier si l'utilisateur est authentifié en vérifiant la validité du token dans l'en-tête d'authentification
 * et en récupérant l'admin associé au token.
 * @param {Object} req - L'objet requête express
 * @param {Object} res - L'objet réponse express
 * @param {Function} next - Le prochain middleware à exécuter
 */
function isAdmin(req, res, next) {
  // Récupère le token dans l'en-tête Authorization
  const token = req.headers["x-auth-token"].replace("Barear ", "");
  // Si le token n'existe pas, renvoie une réponse d'erreur 401
  if (!token) {
    return res.status(401).json({
      message: "Vous devez vous connecter pour accéder à cette ressource.",
    });
  }
  // Vérifie la validité du token avec la clé secrète JWT
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide." });
    }

    try {
      // Récupère l'admin associé au token décodé
      const admin = await Admin.findByPk(decoded.id);
      // Si l'admin n'existe pas, renvoie une réponse d'erreur 401
      if (!admin || admin.dataValues.role !== "admin") {
        return res.status(401).json({
          message:
            "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource.",
        });
      }
      // Ajoute l'admin à l'objet req pour être utilisé dans la suite de la requête
      req.admin = admin.dataValues;
      // Exécute le prochain middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Une erreur est survenue lors de la vérification du token.",
      });
    }
  });
}

module.exports = isAdmin;