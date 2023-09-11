import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {

  carId!: string
  car!: Cars
  editedCar!:Cars
  loading:boolean = true
  editCarForm!: FormGroup; 

  constructor(
    private route: ActivatedRoute,private router: Router,
    private carsService: CarsService,
    )
  {

  } 

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.carId = params.get('id')!
      this.getCarById()
    })
    
    
  }

  getCarById(){
    this.loading = true
    this.carsService.getCarWithId(this.carId).subscribe({
      next: val=>{
        this.car = val.car
        
        this.editedCar=this.car
        this.editCarForm = new FormGroup({
          '_id':new FormControl(this.editedCar._id, Validators.required),
          'Year': new FormControl(this.editedCar.Year, Validators.required),
          'Make': new FormControl(this.editedCar.Make, Validators.required),
          'Model': new FormControl(this.editedCar.Model, Validators.required),
          'UsedNew': new FormControl(this.editedCar.UsedNew, Validators.required),
          'Price': new FormControl(this.editedCar.Price, Validators.required),
          'State': new FormControl(this.editedCar.State, Validators.required),
          'Zipcode': new FormControl(this.editedCar.Zipcode, Validators.required),
          'DealType': new FormControl(this.editedCar.DealType, Validators.required),
          'ComfortRating': new FormControl(this.editedCar.ComfortRating, Validators.required),
          'InteriorDesignRating': new FormControl(this.editedCar.InteriorDesignRating, Validators.required),
          'PerformanceRating': new FormControl(this.editedCar.PerformanceRating, Validators.required),
          'ValueForMoneyRating': new FormControl(this.editedCar.ValueForMoneyRating, Validators.required),
          'ExteriorStylingRating': new FormControl(this.editedCar.ExteriorStylingRating, Validators.required),
          'ReliabilityRating': new FormControl(this.editedCar.ReliabilityRating, Validators.required),
          'FuelType': new FormControl(this.editedCar.FuelType, Validators.required),
          'Transmission': new FormControl(this.editedCar.Transmission, Validators.required),
          'Engine': new FormControl(this.editedCar.Engine, Validators.required),
          'Mileage': new FormControl(this.editedCar.Mileage, Validators.required),
         
      });
        this.loading = false
        
      },
      error: err=>{
        alert(err)
        
      }
    })
  }

  editCar(){
    const car:Cars=this.editCarForm.value
    
      this.carsService.editCar(car).subscribe({
        next:()=>{
          this.router.navigate(['cars-portal'])
        },
        error:err=>{
          console.log(err);
          
        }
      })
    
  }

}
