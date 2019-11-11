const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
       title:{
             type:String,
             required: true
       },
       imageUrl:{
            type:String
      },
      price:{
            type:Number
      },
      description:{
            type:String
      },
      userId:{
            type: Schema.Types.ObjectId,
            ref:'User'
      }
});

module.exports = mongoose.model("Product", Product);







// const fs = require("fs");
// const path = require("path");
// const cart = require("./cart");
// const getContentFile = (cb)=>{
//     const p = path.join(__dirname,"..", "Data", "product.json");
//     fs.readFile(p, (err, content)=>{
//          if(err){
//            return cb([]);
//          }
//          else{
//             cb(JSON.parse(content))
//          } 
//     })
// }
// module.exports = class product{
//       constructor(id, title, image, price, description){
//           this.id = id;
//           this.title = title;
//           this.image = image,
//           this.price = price;
//           this.description =description;
//       };
//       save(){
//           const p = path.join(__dirname, "..","Data", "product.json");
//           getContentFile(products=>{
//             let product = products;
//             if(this.id){
//                const indexProduct = product.findIndex( item => item.id === this.id);
//                const updateProduct = [...product];
//                updateProduct[indexProduct] = this;
//                fs.writeFile(p, JSON.stringify(updateProduct), (err)=>{
//                  console.log(err);
//                })
//             }
//             else{
//               this.id= Math.random().toString();
//               product.push(this);
//               fs.writeFile(p, JSON.stringify(product), (err)=>{
//                 console.log(err);
//             })

//           }
//         })
//       }
//       static findById(id, cb){
//          getContentFile(product=>{
//              const data = product.find(item => item.id===id);
//              cb(data);
//          })
//       }
//       static fetchAll(cb){
//         getContentFile(cb);
//       }
      
//       static deleteById(id){
//          const p = path.join(__dirname, "..", "Data", "product.json");
//           getContentFile(product=>{
//                const item = product.find(data => data.id ===id)
//                const updateProduct = product.filter( item => item.id !==id);
//                fs.writeFile(p, JSON.stringify(updateProduct), err=>{
//                     if(!err){
//                          cart.deleteById(id,item.price )
//                     }
//                })
//           })
//       }
// }