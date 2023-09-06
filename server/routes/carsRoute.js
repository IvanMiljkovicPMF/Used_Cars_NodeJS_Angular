
let CarController=require('../controllers/carController')
let express = require('express')
let router = express.Router()

router.get('/:page',CarController.getAllCarsPagination)

router.get('/car/:id',CarController.getCarByID)
module.exports=router