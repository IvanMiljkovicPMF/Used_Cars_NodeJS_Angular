let UserServices=require('../services/userService')

let register = async (req, res) => {
    try {
      const token = await UserServices.register(req.body.email, req.body.username, req.body.password);
      
      if (!token) {
        return res.status(503).json({ msg: "User exists" });
      }
      return res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
let login = async (req,res)=>{
    res.send({
        "token":req.user.generateJwt()
    })
}
module.exports={
    register,login
}