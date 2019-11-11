const Product = require("../model/products");
const cartModel = require("../model/cart");
exports.getIndex = (req, res, next)=>{
    Product.find()
            .then(product=>{
              res.render("shop/shop", {product:product, title:"Shops", path:"/"});
         })
         .catch(err=>{
             console.log(err);
         })
}

exports.getProduct = (req, res, next)=>{
    Product.find()
           .then(product=>{
               res.render("shop/product", {product:product, title:"Shop product", path:"/shop/product"});
           })
           .catch(err =>{
                console.log(err)
           })
}
// CART
exports.getCard = (req, res, next)=>{
      req.user
         .populate('cart.item.idProduct')
         .execPopulate()
         .then( user=>{
               const Data = user.cart.item;
                res.render("shop/cart", {cartProduct: Data ,title:"Card", path:"/cart"});
         })
}

exports.postCard = (req, res, next) =>{
       const idProduct = req.body.idProduct;
       Product.findById(idProduct) 
          .then(product=>{
               req.user.addToCart(product._id);
               res.redirect('/cart')
          })
          .catch( err=>{
               console.log(err);
          })
}


exports.postCartDelete = (req, res, next)=>{
     const idProduct = req.body.idcartProduct;
     req.user.removeProductCart(idProduct)
             .then( result =>{
                   res.redirect('/cart');
             })
             .catch( err=>{
                   console.log(err);
             })

}
exports.postDecreaseCart = (req, res, next)=>{
    const idProduct = req.body.idcartProduct;
     req.user.decreaseCart(idProduct)
             .then( result=>{
                   res.redirect('/cart');
               })
              .catch( err=>{
                    console.log(err);
              })
}
// DETAIL
exports.getDetail = (req, res, next)=>{
    const idProduct = req.params.idProduct;
    Product.findById(idProduct)
           .then(data=>{
              res.render("shop/detail-product", {data: data})
           })
           .catch( err=>{
                console.log(err);
           })
};


// CHECKOUT

exports.getCheckout = (req, res, next)=>{
     let total = 0;
     req.user
          .populate('cart.item.idProduct')
          .execPopulate()
          .then( user=>{
               const Data = user.cart.item;
               Data.forEach(p=>{
                     return total += p.quality * p.idProduct.price;
               });
               res.render('shop/checkout', {cartProduct: Data, title:"Checkout", total:total})
          })
}

// sk_test_otasG8Sx1QMp0fhxmrPQR2dh00a6elU1sU;