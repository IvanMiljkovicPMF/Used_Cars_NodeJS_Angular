let CarModel = require('../models/car')


let pagination = function (skip, limit, filter) {
    return CarModel.find(filter).skip(skip).limit(limit);
  };
let getNewCars = function(limit){
    return CarModel.find({Year:{$gt:2020}}).limit(limit);
}
let getBestBuyCars = function(limit){
    return CarModel.aggregate([
        { $match: { ReliabilityRating: 5 } }, 
        { $sample: { size: limit } } ]);
}

//number of cars in db
let countAllObj = function(filter)
{
    return CarModel.countDocuments(filter);
}

let getCarByID = function(id)
{
    return CarModel.findById(id)
}

let saveCar= function(car)
{
    return CarModel.saveCar(car);
}
let updateCar= function(car)
{
    return CarModel.updateCar(car);
}

let deleteById = function(id)
{
    return CarModel.deleteById(id)
}
module.exports={
    countAllObj,
    pagination,
    getCarByID,
    getNewCars,
    getBestBuyCars,
    saveCar,
    updateCar,
    deleteById

}