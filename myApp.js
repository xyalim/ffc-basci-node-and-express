var express = require('express');
const dotenv = require('dotenv')
dotenv.config('./env')
var app = express();
const publicPath = __dirname + '/public'

console.log("Hello World")

app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})


app.get('/', function (req, res) {
  const htmlPath = __dirname + '/views/index.html'
  res.sendFile(htmlPath)
})
app.use('/public', express.static(publicPath))

app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: 'HELLO JSON'
    })
  } else {
    res.json({
      message: 'Hello json'
    })

  }
})
app.use('/now',function (req, res, next) {
  req.time = new Date().toString()
  next()
},)

app.get('/now', function (req,res,next) {
  res.json({
    time: req.time
  })
  next()
})






























module.exports = app;
