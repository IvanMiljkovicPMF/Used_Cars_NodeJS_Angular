import { Component } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(private carsService:CarsService ){

  }

  //TODO: bearer token

  getCars(index:number){
    this.carsService.getCarsForPage(index).subscribe({
      next:val=>{
        console.log(val);
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
