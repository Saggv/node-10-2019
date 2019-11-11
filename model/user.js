const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema({
      name:{
          type:String,
          required: true
      },
      email:{
          type:String
      },
      password:{
          type:String,
          required: true
      },
      cart:{
          item:[
                { idProduct:{type:Schema.Types.ObjectId, ref:'Product', required: true},
                  quality: {type: Number, required: true }
                }
              ]
      }
});

User.methods.addToCart = function(productId){
     
     const productIndex = this.cart.item.findIndex( item =>{
           return item.idProduct.toString() === productId.toString() 
       });
     let temProduct = [...this.cart.item];
     const Data = temProduct[productIndex];
     let quality = 1;
     if(Data){
           quality = Data.quality + 1;
           Data.quality = quality;
           this.cart.item[productIndex] = Data;
           return this.save();
     }
     else{
        this.cart.item.push({
            idProduct: productId,
            quality:quality
        })
        return this.save();
     }
}

User.methods.decreaseCart = function(idDelete){
    const productIndex = this.cart.item.findIndex( item =>{
        return item.idProduct.toString() === idDelete.toString();
    });
    const Data = [...this.cart.item];
    const Temp = Data[productIndex];
    if(Temp.quality > 1){
        Temp.quality = Temp.quality -1;
        this.cart.item[productIndex] = Temp;
        return this.save();
    }
    else{
       const ProductData = this.cart.item.filter( item =>{
          return item.idProduct.toString() !== idDelete.toString();
         });
         this.cart.item = ProductData;
       return this.save();
    }
}

User.methods.removeProductCart = function(idDelete){
   const Data =  this.cart.item.filter( item =>{
         return item.idProduct.toString() !== idDelete.toString();
     });
     this.cart.item = Data;
     return this.save();
}
User.methods.clear = function(){
     this.cart.item = [];
     return this.save(); 
}

module.exports = mongoose.model("User", User);