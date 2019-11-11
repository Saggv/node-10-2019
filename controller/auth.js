const User = require("../model/user");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");


const transport = nodemailer.createTransport(sendgridTransport({
       auth:{
              api_key:"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",
       }
}))

//SINGUP
exports.getSingup= (req, res, next)=>{
        let msgErr = req.flash("error");
        if(msgErr.length >0){
               msgErr = msgErr[0];
        }
        else{
              msgErr = null;
        }
        res.render('singup', {msgErr:msgErr});
}

exports.postSingup = (req, res, next) =>{
        const {email, password, Cfpassword, name} = req.body;
        User.findOne({email: email})
            .then( docUser=>{
                    if(docUser){
                       req.flash("error","This email already exist !!!");
                       return res.redirect('/singup')
                    }
                    else{
                         bcrypt.hash(password, 12)
                               .then( hashPassword=>{
                                     const newUser = new User({
                                            name: name,
                                            email: email,
                                            password: hashPassword,
                                            cart:{
                                                   item:[]
                                            }
                                     });
                                     newUser.save()
                                            .then( data=>{
                                                     transport.sendMail({
                                                           to:"sangcf25@gmail.com",
                                                           from:"sangvivi25@gmail.com",
                                                           subject:"Singup successed !!!",
                                                           html: "<h1>You succesfully singup </h1>"
                                                        })
                                                        res.redirect('/login');
                                                    })
                                            })
                                          }
                               })  
                    }     
         

// LOGIN
exports.getLogin = (req, res, next)=>{
      let msgErr = req.flash("error");
      if(msgErr.length >0){
             msgErr = msgErr[0]
      }
      else{
             msgErr = null;
      }
      res.render('login', {msgErr: msgErr});
};

exports.postLogin = (req, res, next)=>{
       const {email, password} = req.body;
      User.findOne({email:email})
           .then( user=>{
                   if(!user){
                          req.flash("error", "This email is not exist !!1")
                          return  res.redirect('/login');
                   }
                   else{
                           bcrypt.compare(password, user.password)
                                 .then( doMatch=>{
                                          if(doMatch){
                                                 req.session.isLogin = true;
                                                 req.session.user = user
                                                 return res.redirect('/');
                                          }
                                          else{
                                                 req.flash("error", "Your password wrong !!!")
                                                 res.redirect('/login');
                                          }
                                 })
                   }
           })
           .catch( err=>{
                  console.log(err);
           })
}

exports.logout = (req, res, next)=>{
      req.session.destroy( ()=>{
             res.redirect('/');
      })
}

