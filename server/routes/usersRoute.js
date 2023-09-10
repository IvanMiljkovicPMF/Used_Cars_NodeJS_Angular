let UserController=require('../controllers/userController')
let express = require('express')
let router = express.Router()
let passport = require('../middleware/passport')

router.get('/',
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'), 
                UserController.getAllUsers
                )
router.get('/:id',UserController.getUserByID)

router.post('/', 
                    passport.authenticate('jwt', {session: false}), 
                    passport.authorizeRoles('ADMIN'),
                    UserController.saveUser
                    )

router.put('/', 
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'),
                UserController.updateUser)

router.delete('/:id',
                passport.authenticate('jwt', {session: false}), 
                passport.authorizeRoles('ADMIN'),
                UserController.deleteById)
module.exports=router
