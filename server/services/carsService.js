let CarModel = require('../models/car')


let pagination = function(skip,limit){
    return CarModel.find({}).skip(skip).limit(limit);
}
let getNewCars = function(limit){
    return CarModel.find({Year:{$gt:2020}}).limit(limit);
}
let getBestBuyCars = function(limit){
    return CarModel.aggregate([
        { $match: { ReliabilityRating: 5 } }, // Filter for cars above 2020 with ReliabilityRating 5
        { $sample: { size: limit } } ]);
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
    countAllObj,
    pagination,
    getCarByID,
    getNewCars,
    getBestBuyCars
}