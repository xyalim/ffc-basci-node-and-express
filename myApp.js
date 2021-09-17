var express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config('./env')
var app = express();
const publicPath = __dirname + '/public'

console.log("Hello World")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// 实现一个根级的请求记录中间件通过
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
// app.use('/now',function (req, res, next) {
//   req.time = new Date().toString()
//   next()
// },)

// 通过链式调用中间件来创建时间服务
app.get('/now', function (req, res, next) {
  req.time = new Date().toString()
  next()
}, function (req, res, next) {
  res.json({
    time: req.time
  })
})

// 从客户端获取输入的路由参数
app.get('/:word/echo', function (req, res, next) {
  res.json({
    echo: req.params.word
  })
})

app.route('/name')
  .get(function (req, res, next) {
    const { first, last } = req.query
    res.json({
      name: `${first} ${last}`
    })
  })
  .post(function (req, res, next) {
    const { first, last } = req.body
    // console.log('req.body',req.body)
    res.json({
      name: `${first} ${last}`
    })
  })

























module.exports = app;
