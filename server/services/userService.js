var UserModel = require("../models/user")

var register = function(email, name, password)
{
    return UserModel.register(email, name, password);
}
var getAllUsers = function()
{
    return UserModel.find({ admin: { $ne: true }});
}
module.exports = {
    register,
    getAllUsers
}