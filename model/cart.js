

// const fs = require("fs");
// const path = require("path");

// const p = path.join(__dirname, "..", "Data", "cart.json");

// module.exports = class Cart{

//      static addTocart(id, price){
//          fs.readFile(p, (err, content)=>{
//              let cart = {product:[], totalPrice:0};
//               if(!err){
//                     cart = JSON.parse(content);
//               }
//               const existProductIndex = cart.product.findIndex(item => item.id ===id);
//               let existProduct = cart.product[existProductIndex];
//               let updateProduct;
//               if(existProduct){
//                  updateProduct = {...existProduct};
//                  updateProduct.quality = existProduct.quality + 1;
//                  cart.product = [...cart.product];
//                  cart.product[existProductIndex] = updateProduct;
//               }
//               else{
//                   updateProduct = {id:id, quality:1}
//                   cart.product = [...cart.product, updateProduct];
//               }
//               cart.totalPrice = cart.totalPrice + +price;
//               fs.writeFile(p, JSON.stringify(cart), (err)=>{
//                    console.log(err);
//               })
//          })
//      }

//      static fetchDataCart(cb){
//            fs.readFile(p, (err, content)=>{
//                 if(err){
//                     console.log(err);
//                     return cb([])
//                 }
//                 let data =[];
//                 data = JSON.parse(content);
//                 return cb(data);
//            })
//      }
     
//      static deleteById(id, price){
//            fs.readFile(p, (err, data)=>{
//                   let cart = {product:[], totalPrice:0};
//                     if(!err){
//                         cart = {...JSON.parse(data)};
//                     }
//                     const updateProduct = cart.product.find(item => item.id ===id);
//                     if(updateProduct){
//                          let quality = updateProduct.quality;
//                          const deleteProduct = cart.product.filter( item => item.id !== id);
//                          cart.product = deleteProduct;
//                          cart.totalPrice = cart.totalPrice - quality*price;
//                          fs.writeFile(p, JSON.stringify(cart), (err)=>{
//                               console.log(err);
//                          })
//                     }
//                     else{
//                          console.log("Not have data in cart !")
//                     }
//            })
//      }

//      static decreaseCart(id, price){
//            fs.readFile(p, (err, content)=>{
//                 let cart = {product:[], totalPrice:0}
//                  if(!err){
//                        cart = {...JSON.parse(content)};
//                  }
//                  const findData = cart.product.findIndex( item => item.id === id);
//                   const temData = cart.product[findData];
//                   let updateData;
//                  if(temData.quality > 1){
//                        updateData = {...temData};
//                        updateData.quality = updateData.quality - 1;
//                        cart.product = [...cart.product];
//                        cart.product[findData] = updateData;
//                        cart.totalPrice = cart.totalPrice - price;
//                        fs.writeFile(p, JSON.stringify(cart), err=>{
//                              console.log(err);
//                        })
//                  }
//                  else{
//                      cart.product = cart.product.filter( item => item.id !==id);
//                      cart.totalPrice = cart.totalPrice - price;
//                      fs.writeFile(p, JSON.stringify(cart), err=>{
//                            console.log(err);
//                      })
//                  }
//            })
//      }
// }
