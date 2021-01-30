// server configration 
// @Author Kishlay Kumar 
// @GET by only search.html
const port = process.env.PORT || 8000;
const express = require('express');
const url = require('url');
const app = express();
const fs = require('fs');
const path = require('path');
const { basename } = require('path');
var BaseDir = path.join(__dirname,"files");
var fileToBeRendered;
var file;

app.get("/redirect",(req,res)=>{
    res.statusCode = 301;
    var url_decode = url.parse(req.url,true).query;
    if(!(url_decode.q == null) && !(url_decode.q == " ") && !(url_decode.q=="")){
        res.redirect(url_decode.q);
        console.log("request for redirecting to : "+url_decode.q);
        console.log("responded as redirecting this client to "+url_decode.q);

    }else{
        fileToBeRendered = "/search.html";
        file = path.join(BaseDir+fileToBeRendered);
        res.sendFile(file,function(err){
            if(err) throw err;
            console.log("file rendered sucessfully !");
        });

    }
})
app.get('/text_search',(req,res)=>{
    res.statusCode = 301;
    var url_decode = url.parse(req.url,true).query;
    if(!(url_decode.q == null) && !(url_decode.q ==" ") && !(url_decode.q=="")){
        var requst_text = "https://www.google.com/search?q=" + url_decode.q;
        res.redirect(requst_text);
        console.log("request for redirecting to : "+url_decode.q+" text");
        console.log("responded as redirecting this client to "+url_decode.q+" text");

    }else{
        fileToBeRendered = "/search.html";
        file = path.join(BaseDir+fileToBeRendered);
        res.sendFile(file,function(err){
            if(err) throw err;
            console.log("404 file rendered sucessfully !");
        });

    }
});
app.get("/",(req,res)=>{
    res.statusCode = 200;
    fileToBeRendered = "/search.html";
    file = path.join(BaseDir+fileToBeRendered);
   res.sendFile(file,function(err){
       if(err) throw err;
       console.log("File rendered successfully !");
   });

})
app.get("/files/drops.jpg",(req,res)=>{
    file = path.join(BaseDir+"/drops.jpg");

    res.sendFile(file,function(err){
        if(err) throw err;
        console.log("requested image sended !");
    })
});
app.get("/files/logo-GhnQBvCJh/logo.png",(req,res)=>{
    file = path.join(BaseDir+"/logo-GhnQBvCJh/logo.png");

    res.sendFile(file,function(err){
        if(err) throw err;
        console.log("requested logo sended !");
    })
});
app.get("*",(req,res)=>{
    // console.log(path.join(BaseDir+req.url));
    fs.exists(path.join(BaseDir+"/"+req.url),(exists)=>{
        if(!exists){
            // res.statusCode = 404;
            res.sendFile(path.join(BaseDir+"/404.html"),(err)=>{
                if (err) throw err;
                console.log("bad 404 request !");
            });
            // res.statusCode = 404;
        }
        else{
            res.sendFile(path.join(BaseDir+req.url));
        }
    });
});

app.listen(port,()=>{
    console.log("server started at port ",port);
})