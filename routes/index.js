const express = require("express");
const route = express.Router();
const AdminRoute = require("./adminRoute");
const ContactRoute = require("./contactRoutes");
const UserRoute = require("./usersRoute");

route.use("/admins", AdminRoute);
route.use("/users", UserRoute);
route.use("/", ContactRoute);

module.exports = route;
