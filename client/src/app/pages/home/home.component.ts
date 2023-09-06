import { Component } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cars: any[] = []

  brojac: number = 625;

  constructor(private carsService:CarsService ){

  }

  ngOnInit(){
    this.getCars(1)
  }

  logCars(){
    console.log(this.cars);
    
  }

  // 626 je max

  //TODO: bearer token

  getCars(index:number){
    this.carsService.getCarsForPage(index).subscribe({
      next:val=>{
        this.cars = []
        console.log(val);
        
        for(let i=0;i<val.cars.length;i++){
          this.cars.push(val.cars[i])
          console.log(val.cars[i]);
        }
        this.brojac++;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
