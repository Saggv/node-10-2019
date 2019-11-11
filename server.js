const express = require("express");
const bodyParse = require("body-parser");
const path = require("path");
const flash = require("connect-flash");
const multer = require("multer");

const User = require("./model/user");

const mongoose = require("mongoose");
const session = require("express-session");
const sessionMongo = require('connect-mongodb-session')(session);

const mongoURi = "mongodb+srv://Sagvv:khongnhoroi@sagvv-xqocr.mongodb.net/shop?retryWrites=true&w=majority";

const store = new sessionMongo({
       uri: mongoURi,
       collection:"session"
})
mongoose.connect(mongoURi, 
               { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
        .then( data=>{ 
                  console.log("Connected with clound mongoose !!!");
              })
        .catch( err =>{
              console.log("Connect with mongoose err !!!");
        })
const app = express();

const fileStorage = multer.diskStorage({
       destination:(req, file, cb)=>{
              cb(null, "image")
       },
       filename: (req, file, cb)=>{
              cb(null, 'image' + '-' + file.originalname);
       }
})

const fileFilter = (req, file, cb)=>{
       if(
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
         ){
                cb(null, true);
                console.log("true")
         }
         else{
                 cb(null, false);
         }
}

app.use(bodyParse.urlencoded({ extended: false }));

//MIDLEWARE UPFILE
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single("image"));

app.use('/image', express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "public")));



app.set("view engine", "pug");
app.set("views", "views")

app.use( session({secret:"secret", resave:false, saveUninitialized: false, store:store}));

// USE FALSH;
app.use( flash());


// route user
app.use((req, res, next)=>{
       if(!req.session.user){
              return next();
       }
      User.findById(req.session.user._id)
           .then( user=>{
                  req.user = user;
                  next();
           })
           .catch( err=>{
                  console.log(err);
           })
})
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const order = require('./routes/order');
const auth = require('./routes/auth');



app.use(auth);

//set variable locals;
app.use((req, res, next)=>{
        res.locals.isLogin = req.session.isLogin;
        next();
})

app.use("/admin",adminRoute.route);
app.use(shopRoute);
app.use(order);

app.use((req, res, next)=>{
     res.render("404");
})

// app.use((err, req, res, next)=>{
//        res.status(500).json({msg:"error add"})
// })


app.listen(3000);
