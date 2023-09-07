const mongoose=require('mongoose')

let CarScheme = mongoose.Schema({
    Year:{type:Number},
    Make:{type:String},
   

})

let CarModel = mongoose.model('car_raws',CarScheme)

module.exports=CarModel