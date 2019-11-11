const adminController = require("../controller/admin");
const express = require("express");
const route = express.Router();
const isAuth = require("../midleware/is-auth");
// GET PRODUCT
route.get("/product", adminController.getProduct);

// ADD PRODUCT
route.get('/add-product', isAuth, adminController.getAddProduct)
route.post("/add-product",isAuth, adminController.postProduct);

// EDIT PRODUCT
route.get('/edit-product/:id',isAuth, adminController.getEditProduct);
route.post('/edit-product',isAuth, adminController.postEditProduct);

// DELETE PRODUCT
route.post('/delete-product',isAuth, adminController.postDeleteProduct);


exports.route = route;
