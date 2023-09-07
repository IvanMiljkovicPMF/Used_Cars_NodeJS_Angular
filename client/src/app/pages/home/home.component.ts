import { Component } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service/cars.service';
import {Router} from '@angular/router';

import axios from 'axios';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {




  

  cars: any[] = []
  currentPage:any
  totalCars!:number
  brojac: number = 625;
  
  constructor(private carsService:CarsService, private router: Router){

  }

  ngOnInit(){
    this.getCars( this.currentPage)
    

  }

  logCars(){
    console.log(this.cars);
    
    
  }

  // 626 je max

  //TODO: bearer token!!!!!!!!

  changePage(event:any){
    this.currentPage = event.page + 1; 
    this.getCars(this.currentPage);
  }

  getCars(index:number){
    this.carsService.getCarsForPage(index).subscribe({
      next:val=>{
        this.cars = []
        // console.log(val);
       
        for(let i=0;i<val.cars.length;i++){
          this.cars.push(val.cars[i])
          // console.log(val.cars[i]);
        }
        this.totalCars=val.total
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  navigateTo(car:any){
    this.router.navigate([`car/${car}`])
  }






}
