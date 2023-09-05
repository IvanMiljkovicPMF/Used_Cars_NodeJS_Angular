const mongoose=require('mongoose')

var CarScheme = mongoose.Schema({
    Year:{type:Number},
    Make:{type:String}
    
})

var CarModel = mongoose.model('car_raws',CarScheme)

module.exports=CarModel