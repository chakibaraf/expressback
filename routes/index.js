const express = require("express");
const route = express.Router();
const AdminRoute = require("./adminRoute");
const ContactRoute = require("./contactRoutes");
const CardRoute = require("./cardRoute");
const UserRoute = require("./usersRoute");
const ArticlesRoute = require("./articles.routes");

route.use("/admins", AdminRoute);
route.use("/users", UserRoute);
route.use("/", ContactRoute);
route.use("/card", CardRoute);
route.use("/articles", ArticlesRoute)

module.exports = route;
