let CarServices=require('../services/carsService')


let getAllCarsPagination=async(req,res)=>{
    try {
        const limit=15;
        const page=req.params.page;
        const skip=(page-1)*limit

        const total=await CarServices.countAllObj();
        const cars=await CarServices.pagination(skip,limit);
        

        res.status(200).json({cars,total});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"HTTP 500 error"})
    }
}
let getCarByID=async(req,res)=>{
    const carId = req.params.id;

    try {
      const car = await CarServices.getCarByID(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'HTTP 500 error' });
    }
}
module.exports={
    getAllCarsPagination,getCarByID
}