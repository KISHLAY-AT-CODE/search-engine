// server configration 
// @Author Kishlay Kumar 
// @GET by only search.html
// initialising port 
const port = process.env.PORT || 8000;
// including express 
const express = require('express');
const url = require('url');
const app = express();
const ejs = require('ejs');
//including file system
const fs = require('fs');
const path = require('path');
// joining basename to folder files 
var BaseDir = path.join(__dirname,"files");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"files"));
// initialising global variables
var fileToBeRendered;
var file;
// redirecting peoples to their respected url requests 
app.get("/redirect",(req,res)=>{
// always do 301 redirect because it will works on all browsers and it reduces the danger of man-in-the-middle attacks 
    res.statusCode = 301;
    var url_decode = url.parse(req.url,true).query;
    // Some requerement's checks 
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
// redirecting the people with their respective text searches results 
app.get('/text_search',(req,res)=>{
// A 301 redirect 
    res.statusCode = 200;
    var url_decode = url.parse(req.url,true).query;
    if(!(url_decode.q == null) && !(url_decode.q ==" ") && !(url_decode.q=="")){
        // console.log(url_decode.q);
        var urlincode = ((url_decode.q).trim()).replace(/\s/g,"+")
        var requst_text = "https://www.bing.com/search?q=" + urlincode;
        res.render("search",{url:requst_text,search:url_decode.q});
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
// Rendering homepage if the request is "/" (base)
app.get("/",(req,res)=>{
    res.statusCode = 200;
    fileToBeRendered = "/search.html";
    file = path.join(BaseDir+fileToBeRendered);
   res.sendFile(file,function(err){
       if(err) throw err;
       console.log("File rendered successfully !");
   });

})
// Some files to use by the sever 
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

// On getting "*" other messages 
// the server will check does the files/folders exist 
// if not the client's will be redirected to the 404 page 
app.get("*",(req,res)=>{
// If you want to show your own 404 pages just comment out the "res.statusCode = 404;" as it will show the defult browser 404 page.
    fs.exists(path.join(BaseDir+"/"+req.url),(exists)=>{
        if(!exists){
            // res.statusCode = 404;
            res.sendFile(path.join(BaseDir+"/404.html"),(err)=>{
                if (err) throw err;
                // console.log("bad 404 request !");
            });
            // res.statusCode = 404;
        }
        else{
            res.sendFile(path.join(BaseDir+req.url));
        }
    });
});

app.listen(port,()=>{
    // printing the message that all is good !
    console.log("server started at port ",port);
})
// all set and done !
// GO GO !