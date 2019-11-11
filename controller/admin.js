const Product = require("../model/products");
const fs = require("fs");

exports.getAddProduct = (req, res, next)=>{
    res.render("admin/add-edit-product", {title: "add products", path:"/admin/add-product", edit:false});
}

exports.postProduct = (req, res, next)=>{
     const {title, price, description} = req.body;
     const fileImage= req.file;
     if(!fileImage){
         return res.render("admin/add-edit-product", {title:"Edit Product", path:"/admin/edit-product",msgErr:"Please pick other Image flile"})
     }

     const product = new Product({
          title:title,
          imageUrl:fileImage.path,
          price:price,
          description:description,
          userId:req.user,
     });

     product.save()
          .then( resds =>{
               res.redirect('/shop/product')
          })
          .catch( err=>{
               console.log(err);
               const error = new Error(err);
               error.httpStatusCode = 500;
               return next(error);
          })
}

// GET EDIT PRODUCT
exports.getEditProduct =(req, res, next)=>{
    const isEdit = req.query.edit;
    const id = req.params.id;
    if(!isEdit){
      return  res.redirect('/');
    }
    Product.findById(id) 
            .then(product=>{
                 res.render("admin/add-edit-product", {title:"Edit Product", path:"/admin/edit-product", edit:true, data:product})
            })
            .catch(err=>{
                 console.log(err);
            })
}

// POST EDIT PRODUCT
exports.postEditProduct = (req, res, next)=>{
     const {id, title,description, price} = req.body;
    let file = req.file;
     if(!file){
          Product.findById(id) 
               .then(product=>{
                    Product.findOneAndUpdate({_id: id}, { $set: {title:title, imageUrl: product.imageUrl, description:description, price:price}}) 
                         .then(data=>{
                              res.redirect('/admin/product')
                         }) 
                })
               .catch( err=>{
                    console.log(err);
               })
     }
     else{
          const product = new Product(id, title, price, description);
          product.save();
            Product.findById(id)
                 .then( data =>{
                      if(file.path){
                        return fs.unlink(data.imageUrl,(err)=>{
                              if(err){
                                   next(err);
                              }
                         });
                      } 
                 })
               Product.findOneAndUpdate({_id: id}, { $set: {title:title, imageUrl: file.path, description:description, price:price}})  
                 .then(data=>{
                     res.redirect('/admin/product')
                 })
                 .catch( err=>{
                      console.log(err);
                 })
     }
}

// POST DELETE
exports.postDeleteProduct = (req, res, next)=>{
        const idProduct = req.body.id;
        Product.findById(idProduct)
               .then(data=>{
                    fs.unlink(data.imageUrl, (err)=>{
                         if(err){
                              next(err);
                         }
                    });
                    Product.findByIdAndRemove(idProduct)
                    .then( data=>{
                        res.redirect('/admin/product');
                    })
               })
               .catch(err=>{
                    console.log(err);
               })

}

exports.getProduct=(req,res,next)=>{
    Product.find()
          .populate('userId')
          .then( product=>{
                    res.render("admin/product", {product:product, title:"Admin product", path:"/admin/product"})
          })
          .catch( err=>{
               console.loge(err);
          })
}
