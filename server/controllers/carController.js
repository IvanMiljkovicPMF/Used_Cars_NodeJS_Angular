let CarServices=require('../services/carsService')

// let getAllCars=async(req, res)=>{
//     const car = await CarServices.find()
//     const car1=car
//     const empty=[]
//     car1.forEach(element => {
//         empty.push(element.Year)
//         console.log(element.Year);
//     });
//     res.json(empty)
// }

let getAllCarsPagination=async(req,res,next)=>{
    try {
        const limit=15;
        const page=req.params;
        const skip=(page-1)*limit

        const total=await CarServices.countAllObj();
        const cars=await CarServices.pagination(skip,limit);
        

        res.status(200).json({cars,total});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"HTTP 500 error"})
    }
}
module.exports={
    getAllCarsPagination
}