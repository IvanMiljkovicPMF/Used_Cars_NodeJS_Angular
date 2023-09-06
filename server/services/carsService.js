let CarModel = require('../models/car')


let pagination = function(skip,limit){
    return CarModel.find({}).skip(skip).limit(limit);
}
//number of cars in db
let countAllObj = function()
{
    return CarModel.countDocuments({});
}

let getCarByID = function(id)
{
    return CarModel.findById(id)
}
module.exports={
    countAllObj,pagination,getCarByID
}