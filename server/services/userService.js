let UserModel = require("../models/user")

let register = function(email, name, password)
{
    return UserModel.register(email, name, password);
}
let getAllUsers = function()
{
    return UserModel.find({ admin: { $ne: true }});
}
let getUserByID = function(id)
{
    return UserModel.findById(id)
}

let updateUser= function(car)
{
    return UserModel.updateUser(car);
}

let deleteById = function(id)
{
    return UserModel.deleteById(id)
}
module.exports = {
    register,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteById
}