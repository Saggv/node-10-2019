const shopController = require("../controller/shop");
const express = require("express");
const route = express.Router();
const isAuth = require("../midleware/is-auth");

route.get('/',shopController.getIndex);
route.get('/shop/product', shopController.getProduct);

//CART
route.get('/cart',isAuth , shopController.getCard);
route.post('/cart',isAuth , shopController.postCard);
route.post('/cart/delete',isAuth , shopController.postCartDelete);
route.post('/cart/decrease', isAuth ,shopController.postDecreaseCart);

//CHECTOUT
route.get('/shop/checkout', isAuth, shopController.getCheckout);

//GET DETAIL
route.get('/shop/detail-product/:idProduct', shopController.getDetail);

module.exports = route;