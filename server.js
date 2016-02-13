var path = require('path');
var express = require('express');
var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: 'uploads/'});

var app = express();


app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname+"/client/index.html"));
});

app.post('/app/analyse', upload.single("myfile"), function(req, res) {

  var file = {
    "name": req.file.originalname,
    "fileSize": req.file.size
  }
  console.log(file.name);
  
  // Delete the file
  fs.unlink(req.file.path, function(err) {
    if (err) return console.error(err);
    console.log("File deleted successfully!");
  });
  
  // Send the data
  res.json(file);
});

app.listen(process.env.PORT || 8080); // Listen on port