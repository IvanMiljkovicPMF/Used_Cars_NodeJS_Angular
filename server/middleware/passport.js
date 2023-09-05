var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var JwtExtractor = require('passport-jwt').ExtractJwt
var UserModel = require('../models/user')

let localOptions = {
    usernameField: "email"
}

passport.use(new LocalStrategy(localOptions, async function(email, password, done){
    var user = await UserModel.findOne({email:email});
    // console.log(user)

    if (!user)
    {
        //error
        done(null,null, {
            message: "Credentials not valid!"
        })
    }
    else
    {
        var validate = user.validatePassword(password);
        if (!validate)
        {
            //error
            done(null,null, {
                message: "Credentials not valid!"
            })
        }
        else
        {
            //done
            done(null, user)
        }
    }
}))
var jwtOptions = {
    secretOrKey: "SECRET",
    jwtFromRequest: JwtExtractor.fromAuthHeaderAsBearerToken()
}
passport.use(new JwtStrategy(jwtOptions, async function(jwt_payload, done){
    var user = await UserModel.findById(jwt_payload._id)
    console.log(user)
    if (!user)
    {
        done(null, null ,{
            message: "Credentials not valid!"
        })
    }
    else
    {
        done(null, user)
    }

}))
passport.authorizeRoles = (...roles) => (req,res,next) => {
    req.user
    var validate = roles.find(role=> role === req.user.getRole());
    if (validate)
        next();
    else
    {
        res.status(403)
        return res.send("Not Authorized")
    }
}

passport.log = () => (req,res,next) => {
    console.log("Pristupio je korisnik: "+req.user.name);
    next()
}
module.exports = passport