let authService = require('../services/userService')
let express = require('express')
let router = express.Router()

let passport = require('../middleware/passport')
let userController = require('../controllers/userController')

router.post('/register',
                        userController.register,
                       
                        )

router.post('/login', passport.authenticate('local', {session: false}),userController.login)


router.post('/validate', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
    res.status(200).send(true)
})

module.exports = router;