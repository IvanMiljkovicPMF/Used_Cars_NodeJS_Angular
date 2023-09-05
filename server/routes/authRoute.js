var authService = require('../services/userService')
var express = require('express')
var router = express.Router()

var passport = require('../middleware/passport')
var userController = require('../controllers/userController')

router.post('/register',userController.register)

router.post('/login', passport.authenticate('local', {session: false}),userController.login)


router.post('/validate', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
    res.status(200).send(true)
})

module.exports = router;