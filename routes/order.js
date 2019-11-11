const express = require("express");
const route = express.Router();

const orderController = require('../controller/order');

route.get('/order',orderController.getOrder);

route.post('/order', orderController.postOrder);

route.post('/order/delete', orderController.deleteOrder);

route.get('/order/:orderId', orderController.getInvoice);


module.exports = route;