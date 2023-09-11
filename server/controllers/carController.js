let CarServices=require('../services/carsService')


let getAllCarsPagination=async(req,res)=>{
    try {
        const limit=15;
        const page=req.params.page;
        const skip=(page-1)*limit
        const { model, make, minPrice, maxPrice, year } = req.query;
        
        const filter = {};

        if (model) {
          filter.Model = { $regex: model, $options: 'i' };
        }
        if (make) {
          filter.Make = { $regex: make, $options: 'i' };
        }
        if (minPrice && maxPrice) {
          // Convert minPrice and maxPrice to Int32
          filter.Price = {
            $gte: parseInt(minPrice),
            $lte: parseInt(maxPrice),
          };
        }
        if (year) {
          filter.Year = year;
        }

        const total=await CarServices.countAllObj(filter);
        const cars=await CarServices.pagination(skip, limit, filter);
        if(!cars)
        {
           return res.status(404).json({ error: 'Cars not found' });
        }

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
      res.status(200).json({car});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'HTTP 500 error' });
    }
}
let getCars=async(req,res)=>{
  try {
      const limit=15;
      const newCars=await CarServices.getNewCars(10);
      const bestBuy=await CarServices.getBestBuyCars(limit);
      if(!newCars || !bestBuy)
      {
         return res.status(404).json({ error: 'Cars not found' });
      }

      return res.status(200).json({newCars,bestBuy});

  } catch (error) {
      console.log(error);
      return res.status(500).json({msg:"HTTP 500 error"})
  }
}
let saveCar = async (req, res) => {
  try {
    const car = await CarServices.saveCar(req.body.car);
    if(!car)
    {
      return res.status(404).json({ error: 'Car not created' });
    }
    res.status(201).json({car}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' }); 
  }
};

let updateCar = async(req,res)=>{
  try {
    
    const car = await CarServices.updateCar(req.body);
    if(!car)
    {
      return res.status(404).json({ error: 'Car not updated' });
    }
    res.status(204).json({car}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' }); 
  }
};

let deleteById = async(req,res)=>{
  const carId = req.params.id;
  try {
    const car = await CarServices.deleteById(carId);
    if(!car)
    {
      return res.status(404).json({ error: 'Car not deleted' });
    }
    res.status(204).json({car}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'HTTP 500 error' }); 
  }
}
module.exports={
    getAllCarsPagination,
    getCarByID,
    getCars,
    saveCar,
    deleteById,
    updateCar
  }