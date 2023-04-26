const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    if (!req.files) return res.status(403).send("forbiden");

    const file = req.files.image;
    // etre sur d'avoir que des images dans la requettes
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
    res.send("great one");
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

router.post("/card", async (req, res) => {
  res.status(200).send(req.body);
});

module.exports = router;
