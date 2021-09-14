var express = require('express');
var app = express();
const publicPath = __dirname + '/public'

console.log("Hello World")

app.get('/',function(req,res){
  const htmlPath = __dirname + '/views/index.html'
  res.sendFile(htmlPath)
})
app.use('/public',express.static(publicPath))

app.get('/json',function (req,res) {
  res.json({
    message:'Hello json'
  })
})
































 module.exports = app;
