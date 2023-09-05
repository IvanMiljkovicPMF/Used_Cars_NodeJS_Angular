const express=require('express')
const app=express()
const config = require('./configuration/config')
const cors = require('cors')

var mongoose=require('mongoose')
mongoose.connect(config.dbConnection)

const carRoute=require('./routes/carsRoute')
const authRoutes = require('./routes/authRoute')

app.use(express.json())
app.unsubscribe(cors())

app.use('/home',carRoute)
app.use("/auth",authRoutes)

app.get('/',function(req,res){
    res.send('Hello World!');
})

app.listen(config.port,()=>{
    console.log('Listening on port: '+config.port)
})