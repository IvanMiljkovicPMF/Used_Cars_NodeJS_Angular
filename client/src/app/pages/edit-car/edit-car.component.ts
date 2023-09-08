import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    )
  {

  } 

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.carId = params.get('id')!
    })
    // console.log(this.carId);
    this.getCarById()
  }

  getCarById(){
    this.carsService.getCarWithId(this.carId).subscribe({
      next: val=>{
        console.log(val.car);
        this.car = val.car
        console.log(this.car);

        this.editedCar=this.car
        
      },
      error: err=>{
        alert(err)
        
      }
    })
  }

  editCar(){
    alert("ovde proslediti podatke izmenjene podatke")
  //   this.carsService.editCar(this.editedCar).subscribe({
  //     next:val=>{
  //       console.log(val);
        
  //     },
  //     error:err=>{
  //       console.log(err);
        
  //     }
  //   })
  }

}
