
let CarController=require('../controllers/carController')
let express = require('express')
let router = express.Router()

router.get('/:page',CarController.getAllCarsPagination)

router.get('/',CarController.getCars)

router.get('/car/:id',CarController.getCarByID)



// router.get('/bestbuy',CarController.)

module.exports=router