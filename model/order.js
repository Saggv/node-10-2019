const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Orders = new Schema({
     products:[
         {
             product:{
                 type: Object
             },
             quality:{
                 type: Number
             }
         }
     ],
     user:{
         name:{
             type:String
         },
         userId:{
             type: Schema.Types.ObjectId
         }
     }
});

module.exports = mongoose.model('Orders', Orders);