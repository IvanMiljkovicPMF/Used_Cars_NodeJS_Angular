const express=require('express')
const app=express()
const config = require('./configuration/config')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

let mongoose=require('mongoose')
mongoose.connect(config.dbConnection)

const carRoute=require('./routes/carsRoute')
const authRoutes = require('./routes/authRoute')

app.use(express.json())
app.use(cors())

app.use('/home',carRoute)
app.use('/cars',carRoute)
app.use('/profile',carRoute)
app.use("/auth",authRoutes)


app.use('/google-search', createProxyMiddleware({
    target: 'https://www.google.com',
    changeOrigin: true,
    pathRewrite: {
      '^/google-search': '',
    },
  }));
app.get('/',function(req,res){
    res.send('Hello World!');
})

app.listen(config.port,()=>{
    console.log('Listening on port: '+config.port)
})