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

    this.getCars(1)
  }

  navigateToEdit(id:string){
    this.router.navigate([`edit-car/${id}`])
  }

  deleteCar(id:string){
    if (window.confirm("Are you sure you want to delete this car ad?")) {
      this.carService.deleteCar(id).subscribe({
        next:val=>{
          alert("You have deleted a car ad.")
          this.allCars = this.allCars.filter(car => car._id !== id);
          this.getCars(this.currentPage)
        },
        error:err=>{
          console.log(err);
          alert("An error has occured")
          
        }
      })
    }
    
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
