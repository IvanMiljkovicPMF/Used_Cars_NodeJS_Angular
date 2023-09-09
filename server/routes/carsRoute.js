
let CarController=require('../controllers/carController')
let express = require('express')
let router = express.Router()
let passport = require('../middleware/passport')

router.get('/:page',CarController.getAllCarsPagination)

router.get('/',CarController.getCars)

router.get('/car/:id',CarController.getCarByID)

router.post('/add', 
                    passport.authenticate('jwt', {session: false}), 
                    passport.authorizeRoles('ADMIN','VENDOR'),
                    CarController.saveCar

                    )

router.put('/edit', 
                    passport.authenticate('jwt', {session: false}), 
                    passport.authorizeRoles('ADMIN','VENDOR'),
                    CarController.updateCar)

router.delete('/delete/:id',
                    passport.authenticate('jwt', {session: false}), 
                    passport.authorizeRoles('ADMIN','VENDOR'),
                    CarController.deleteById)

module.exports=router

