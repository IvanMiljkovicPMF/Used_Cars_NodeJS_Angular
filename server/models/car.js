const mongoose=require('mongoose')

let CarScheme = mongoose.Schema({
    Year: { type: Number },
    Make: { type: String },
    Model: { type: String },
    UsedNew: { type: String },
    Price: { type: Number },
    ConsumerRating: { type: Number },
    ConsumerReviews: { type: Number },
    SellerType: { type: String },
    SellerName: { type: String },
    SellerRating: { type: Number },
    SellerReviews: { type: Number },
    StreetName: { type: String },
    State: { type: String },
    Zipcode: { type: String },
    DealType: { type: String },
    ComfortRating: { type: Number },
    InteriorDesignRating: { type: Number },
    PerformanceRating: { type: Number },
    ValueForMoneyRating: { type: Number },
    ExteriorStylingRating: { type: Number },
    ReliabilityRating: { type: Number },
    ExteriorColor: { type: String },
    InteriorColor: { type: String },
    Drivetrain: { type: String },
    MinMPG: { type: Number },
    MaxMPG: { type: Number },
    FuelType: { type: String },
    Transmission: { type: String },
    Engine: { type: String },
    VIN: { type: String },
    Stock: { type: String }, 
    Mileage: { type: Number },
})

let CarModel = mongoose.model('car_raws',CarScheme)
CarModel.saveCar = function (car){

    let newCar = new CarModel({
        Year: car.Year || 0,
        Make: car.Make || '',
        Model: car.Model || '',
        UsedNew: car.UsedNew || '',
        Price: car.Price || 0,
        ConsumerRating: car.ConsumerRating || 0,
        ConsumerReviews: car.ConsumerReviews || 0,
        SellerType: car.SellerType || '',
        SellerName: car.SellerName || '',
        SellerRating: car.SellerRating || 0,
        SellerReviews: car.SellerReviews || 0,
        StreetName: car.StreetName || '',
        State: car.State || '',
        Zipcode: car.Zipcode || '',
        DealType: car.DealType || '',
        ComfortRating: car.ComfortRating || 0,
        InteriorDesignRating: car.InteriorDesignRating || 0,
        PerformanceRating: car.PerformanceRating || 0,
        ValueForMoneyRating: car.ValueForMoneyRating || 0,
        ExteriorStylingRating: car.ExteriorStylingRating || 0,
        ReliabilityRating: car.ReliabilityRating || 0,
        ExteriorColor: car.ExteriorColor || '',
        InteriorColor: car.InteriorColor || '',
        Drivetrain: car.Drivetrain,
        MinMPG: car.MinMPG || 0,
        MaxMPG: car.MaxMPG || 0 , 
        FuelType: car.FuelType || '',
        Transmission: car.Transmission || '',
        Engine: car.Engine || '',
        VIN: car.VIN || '',
        Stock: car.Stock || '',
        Mileage: car.Mileage || 0
      
    });
    newCar.save();
    return newCar;
}

CarModel.updateCar = async function (carObj){
    let car = await CarModel.findById(carObj._id);
    Object.assign(car, carObj);
    car.save();

    return car;
}

CarModel.deleteById = async function(id){
        
    let success = await CarModel.findOneAndDelete({ _id: id }).then(async function(car){
        return !!(typeof car !== 'undefined' && car);
    });

    return success;
}

module.exports=CarModel