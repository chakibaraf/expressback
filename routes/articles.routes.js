const express = require("express");
const Article = require("../models/article");
const fs = require('fs');
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    if (!req.files) return res.status(403).send("forbiden");

    const file = req.files.image;
    // etre sur d'avoir que des images dans la requetes
    const type = file.mimetype.split("/")[0];
    if (type !== "image")
      return res.status(403).send("only images are allowed !");
    // ----------------------------

    // get data from request
    const data = JSON.parse(req.body.data);
    const fullName = `${file.md5}_${file.name}`;

    const result = await Article.create({ ...data, image: fullName });
    console.log(result);

    file.mv(`./public/${process.env.FILE_UPLOAD}/${fullName}`);
    res.send("Article ajoute");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/", async (_req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post("/cards", async (req, res) => {
  res.status(200).send(req.body);
});





router.delete("/card/:id", async (req, res) => {
  try {
    const card = await Article.findByPk(req.params.id);
    if (!card) {
      return res.status(404).send("article non trouve");
    }
    await Article.destroy({ where: { id: req.params.id } });
    const imagePath = `./public/${process.env.FILE_UPLOAD}/${card.image}`;
    fs.unlinkSync(imagePath); // Supprime l'image associée à la carte
    res.send("Card supprimé succés");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
