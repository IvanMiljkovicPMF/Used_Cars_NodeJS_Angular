let UserController=require('../controllers/userController')
let express = require('express')
let router = express.Router()
let passport = require('../middleware/passport')

router.get('/',
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'), 
                UserController.getAllUsers
                )
router.post('/', 
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'),
                UserController.getAllUsers

                )

router.put('/', 
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'),
                UserController.getAllUsers)

router.delete('/:id',
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'),
                UserController.getAllUsers)
module.exports=router
