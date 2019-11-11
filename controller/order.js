const Order = require("../model/order");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const stripe = require('stripe')('sk_test_otasG8Sx1QMp0fhxmrPQR2dh00a6elU1sU');

exports.getOrder = (req, res, next)=>{
     Order.find({'user.userId': req.session.user._id})
          .then( orders=>{
               res.render('shop/order', {Data: orders,path:'/order'})
          })
          .catch( err=>{
              console.log(err);
          })

}

exports.postOrder = (req, res, next)=>{

     const token = req.body.stripeToken; // Using Express
     let total = 0;
     req.user
        .populate('cart.item.idProduct')
        .execPopulate()
        .then( user=>{
            user.cart.item.forEach(p =>{
                 return total += p.quality * p.idProduct.price;
            })
             const productss = user.cart.item.map( data=>{
                  return {quality: data.quality, product: {...data.idProduct}}
             });
             const orderProduct = new Order({
                  products: productss,
                  user:{
                      name: req.user.name,
                      userId: req.user
                  }
             });
             return orderProduct.save()  
        })
        .then( data=>{
               (async () => {
                    const charge = await stripe.charges.create({
                    amount:total*100,
                    currency: 'usd',
                    description: 'Pay for item you order',
                    source: token,
                    statement_descriptor: 'Test payment',
                    metadata:{oder_id: data._id.toString()}
                    });
                    })();
            req.user.clear()
        })
        .then( data=>{
             res.redirect('/order')
        })
        .catch(err=>{
             console.log(err);
        })
}

exports.deleteOrder = (req, res, next)=>{
     const idOder = req.body.orderId;
     Order.findByIdAndRemove(idOder)
     .then(data=>{
          Order.find({'user.userId': req.session.user._id})
               .then( orders=>{
                    res.render('shop/order', {Data: orders,path:'/order'})
               })
     })
     .catch(err=>{
          console.log(err);
     })
}

exports.getInvoice=(req, res, next)=>{
     const orderId = req.params.orderId;
     const invoiceName = 'invoice-data.pdf';    //'invoice-'+ orderId + '.pdf';
     const invoiceFile = path.join('invoice', invoiceName);
    
     const pdfFile = new PDFDocument();

     pdfFile.pipe(fs.createWriteStream(invoiceFile));

     pdfFile.text('Hello world');
     pdfFile.fontSize(18).text("Vi A Sang");
     pdfFile.end();
     pdfFile.pipe(res);
     // fs.readFile(invoiceFile, (err,data)=>{
     //      if(err){
     //         console.log(err);
     //      };
     //      res.setHeader('Content-Type', 'application/pdf');
     //      res.setHeader('Content-Disposition', 'attachment; filename="'+ invoiceName + '"');
     //      res.send(data);
     // })

      // ------Another way-----
     //     const file = fs.createReadStream(invoiceFile);
     //      res.setHeader('Content-Type', 'application/pdf');
     //      res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
     //      file.pipe(res);

}
