import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cars } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{

  addCarForm!: FormGroup; 
  car!:Cars
  constructor(private router:Router,private carService:CarsService){}

  ngOnInit() {
      this.addCarForm = new FormGroup({
          'Year': new FormControl(0, Validators.required),
          'Make': new FormControl('', Validators.required),
          'Model': new FormControl('', Validators.required),
          'UsedNew': new FormControl('', Validators.required),
          'Price': new FormControl(0, Validators.required),
          'State': new FormControl('', Validators.required),
          'Zipcode': new FormControl('', Validators.required),
          'DealType': new FormControl('', Validators.required),
          'ComfortRating': new FormControl(0, Validators.required),
          'InteriorDesignRating': new FormControl(0, Validators.required),
          'PerformanceRating': new FormControl(0, Validators.required),
          'ValueForMoneyRating': new FormControl(0, Validators.required),
          'ExteriorStylingRating': new FormControl(0, Validators.required),
          'ReliabilityRating': new FormControl(0, Validators.required),
          'FuelType': new FormControl('', Validators.required),
          'Transmission': new FormControl('', Validators.required),
          'Engine': new FormControl('', Validators.required),
          'Mileage': new FormControl(0, Validators.required),
         
      });
  }
  addCar(){
    const car:Cars=this.addCarForm.value
    this.carService.addCar(car).subscribe({
      next:()=>{
        alert("You have successfully created a car ad.")
        this.router.navigate(['cars-portal']);
      }
    })
  }

}
