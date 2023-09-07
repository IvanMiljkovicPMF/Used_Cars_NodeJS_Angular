
let CarController=require('../controllers/carController')
let express = require('express')
let router = express.Router()

router.get('/:page',CarController.getAllCarsPagination)

router.get('/',CarController.getCars)

router.get('/car/:id',CarController.getCarByID)

router.post('/add',CarController.saveCar)

router.put('/edit',CarController.updateCar)

router.delete('/delete/:id',CarController.deleteById)

module.exports=router

