let UserServices=require('../services/userService')

let register= async (req,res)=>{
    try{
        var token = await UserServices.register(req.body.email, req.body.name, req.body.password);
    }
    catch(err){
        console.log(err)
         return res.status(500).json({msg:"HTTP 500 error"})
    }if (!token)
       return res.status(503).json({msg:"User exists"})

    res.send(token)
}
let login = async (req,res)=>{
    res.send({
        "token":req.user.generateJwt()
    }
)
}
module.exports={
    register,login
}