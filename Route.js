const fs = require("fs");

const route = (req, res)=>{
    const url = req.url;
    const method= req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter message </title></head>');
        res.write('<body><form method="POST" action="/message"><input name="message" type"text"/> <button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==="/message" && method==="POST"){
         const body = [];
         req.on("data", (data)=>{
              console.log(data);
              body.push(data);
         })
         return req.on("end", ()=>{
             const parserBody = Buffer.concat(body).toString();
             const message = parserBody.split("=")[1];
             fs.writeFile("data.txt",message , (err)=>{
              res.statusCode=302;
              res.setHeader('Location', '/');
              return res.end();
             });

         })
    }
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write('<body><h1>Hello from home server</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = route;