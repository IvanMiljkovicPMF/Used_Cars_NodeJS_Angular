var CarModel = require('../models/car')

// var find = function()
// {
//     return CarModel.find({}).limit(2)
// }
//pagination
var pagination=function(skip,limit){
    return CarModel.find({}).skip(skip).limit(limit);
}
//number of cars in db
var countAllObj=function()
{
    return CarModel.countDocuments({});
}

module.exports={
    countAllObj,pagination
}