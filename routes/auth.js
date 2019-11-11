const express = require("express");
const authController = require("../controller/auth");
const route = express.Router();

route.get('/singup', authController.getSingup);

route.post('/singup', authController.postSingup);

route.get('/login', authController.getLogin);

route.post('/login', authController.postLogin)

route.post('/logout', authController.logout)

module.exports = route;