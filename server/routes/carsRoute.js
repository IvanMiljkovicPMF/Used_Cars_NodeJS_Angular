
var CarController=require('../controllers/carController')
var express = require('express')
var router = express.Router()

router.get('/cars/:page',CarController.getAllCarsPagination)

module.exports=router