import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-cars-portal',
  templateUrl: './cars-portal.component.html',
  styleUrls: ['./cars-portal.component.css']
})
export class CarsPortalComponent {

  allCars: Cars[] = []

  currentPage:any
  loading: boolean = true
  totalCars!:number

  constructor(
    private carService:CarsService,
    private router: Router
    ){

  }

  ngOnInit(){
    const car1: Cars = {
      _id: "123",
      Year: 2022,
      Make: 'Toyota',
      Model: 'Camry',
      UsedNew: 'New',
      Price: '$25,000',
      ConsumerRating: 4.5,
      ConsumerReviews: 150,
      SellerType: 'Dealership',
      SellerName: 'ABC Auto Sales',
      SellerRating: 4.8,
      SellerReviews: 200,
      StreetName: '123 Main Street',
      State: 'California',
      Zipcode: '12345',
      DealType: 'Purchase',
      ComfortRating: 4.2,
      InteriorDesignRating: 4.0,
      PerformanceRating: 4.3,
      ValueForMoneyRating: 4.7,
      ExteriorStylingRating: 4.5,
      ReliabilityRating: 4.6,
      ExteriorColor: 'Blue',
      InteriorColor: 'Gray',
      Drivetrain: 'Front-Wheel Drive',
      MinMPG: 28,
      MaxMPG: 34,
      FuelType: 'Gasoline',
      Transmission: 'Automatic',
      Engine: '2.5L 4-cylinder',
      VIN: '1HGCM82633A123456',
      Stock: '12345678',
      Mileage: 0
    };
    
    const car2: Cars = {
      _id: "124",
      Year: 2019,
      Make: 'Ford',
      Model: 'Mustang',
      UsedNew: 'Used',
      Price: '$20,000',
      ConsumerRating: 4.7,
      ConsumerReviews: 120,
      SellerType: 'Private Seller',
      SellerName: 'John Smith',
      SellerRating: 4.5,
      SellerReviews: 50,
      StreetName: '456 Oak Avenue',
      State: 'Texas',
      Zipcode: '54321',
      DealType: 'Purchase',
      ComfortRating: 4.0,
      InteriorDesignRating: 4.2,
      PerformanceRating: 4.9,
      ValueForMoneyRating: 4.5,
      ExteriorStylingRating: 4.8,
      ReliabilityRating: 4.4,
      ExteriorColor: 'Red',
      InteriorColor: 'Black',
      Drivetrain: 'Rear-Wheel Drive',
      MinMPG: 18,
      MaxMPG: 25,
      FuelType: 'Gasoline',
      Transmission: 'Manual',
      Engine: '5.0L V8',
      VIN: '1FA6P8CF2K1234567',
      Stock: '87654321',
      Mileage: 25000
    };


    this.allCars.push(car1)
    this.allCars.push(car2)
    // this.carService.getAllCars().subscribe({
    //   next:val=>{

    //   },
    //   error:err=>{

    //   }
    // })
    this.getCars(1)
  }

  navigateToEdit(id:string){
    this.router.navigate([`edit-car/${id}`])
  }

  deleteCar(id:string){

    // Use the filter method to create a new array without the item with the matching ID
    this.allCars = this.allCars.filter(car => car._id !== id);
    
    // this.carService.deleteCar(id).subscribe({
    //   next:val=>{
    //     console.log(val);
    //     this.allCars = this.allCars.filter(car => car._id !== id);
    //   },
    //   error:err=>{
    //     console.log(err);
    //     alert("An error has occured")
        
    //   }
    // })
  }

  changePage(event:any){
    this.currentPage = event.page + 1; 
    this.getCars(this.currentPage);
  }

  getCars(index:number){
    this.loading = true
    this.carService.getCarsForPage(index).subscribe({
      next:val=>{
        this.allCars = []
        // console.log(val);
       
        for(let i=0;i<val.cars.length;i++){
          this.allCars.push(val.cars[i])
          // this.allCars[i].imageUrl = this.get10thCarImage(i)
          // console.log(val.cars[i]);
        }
        this.totalCars=val.total
        this.loading = false;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }


}
