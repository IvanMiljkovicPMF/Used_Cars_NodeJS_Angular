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
  loading:boolean = true

  // TODO: ovde ubaciti form group jer je najlakse za koristiti GUGLAJ
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
    this.getCarById()
  }

  getCarById(){
    this.loading = true
    this.carsService.getCarWithId(this.carId).subscribe({
      next: val=>{
        this.car = val.car

        this.editedCar=this.car
        this.loading = false
        
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
