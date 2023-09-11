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
let getAllUsers = async(req, res) =>{
  try {
    const users=await UserServices.getAllUsers();
    if(!users)
    {
       return res.status(404).json({ error: 'Cars not found' });
    }

    res.status(200).json({users});
  } catch (error) {
      console.log(error);
      return res.status(500).json({msg:"HTTP 500 error"})
  }
}
let getUserByID=async(req,res)=>{
  const userId = req.params.id;

  try {
    const user = await UserServices.getUserByID(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' });
  }
}
let saveUser = async (req, res) => {
  try {
    const user = await UserServices.saveUser(req.body.email, req.body.username, req.body.password);
    
    if (!user) {
      return res.status(503).json({ msg: "User exists" });
    }
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
let updateUser = async(req,res)=>{
  try {
    
    const user = await UserServices.updateUser(req.body);
    if(!user)
    {
      return res.status(404).json({ error: 'User not updated' });
    }
    res.status(204).json({user}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' }); 
  }
};

let deleteById = async(req,res)=>{
  const userId = req.params.id;
  try {
    const user = await UserServices.deleteById(userId);
    if(!user)
    {
      return res.status(404).json({ error: 'User not deleted' });
    }
    res.status(204).json({user}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' }); 
  }
}
module.exports={
    register,
    login,
    getAllUsers,
    getUserByID,
    saveUser,
    updateUser,
    deleteById

}