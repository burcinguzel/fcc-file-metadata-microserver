var express = require('express');
var path = require("path");
var multer = require("multer");
var bodyparser = require("body-parser");
var fs = require("fs");

var upload = multer( {dest: 'uploads/' });
var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyparser.json());

app.get("/",function(req, res) {
      res.sendfile(__dirname + '/public/index.html');
});

app.post("/get-file-size",upload.single('dosya'),function(rq,rs){
  console.log("body");
  console.log(rq.file);
  if(rq.file){
         fs.unlink(rq.file.path, function(data,err) {
            if (err) throw err;
         console.log('successfully deleted '+rq.file.path);
      });
    rs.send(JSON.stringify({size:rq.file.size}));
   }
  else
    rs.send("File cannot be uploaded");
  
});




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
