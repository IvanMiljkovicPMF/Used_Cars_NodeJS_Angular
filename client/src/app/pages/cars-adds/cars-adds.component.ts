import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Companies } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service/cars.service';

import axios from 'axios';


@Component({
  selector: 'app-cars-adds',
  templateUrl: './cars-adds.component.html',
  styleUrls: ['./cars-adds.component.css']
})
export class CarsAddsComponent {

  rangeValues: [number,number] = [12000, 50000];

  loading: boolean = true;

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
    this.loading = true
    this.carsService.getCarsForPage(index).subscribe({
      next:val=>{
        this.cars = []
        // console.log(val);
       
        for(let i=0;i<val.cars.length;i++){
          this.cars.push(val.cars[i])
          this.cars[i].imageUrl = this.get10thCarImage(i)
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
  navigateTo(car:any){
    this.router.navigate([`car/${car}`])
  }


  async get10thCarImage(i: number): Promise<void> {

    const query = `${this.cars[i].Model}+${this.cars[i].Make}+${this.cars[i].Year}`
    console.log(query);
    
    try {
      const response = await axios.get(`http://localhost:3000/google-search/search?q=${query}&tbm=isch`);
      const html: string = response.data;
  
      // Find the 10th occurrence of the image URL string
      const imageUrlMarker = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9Gc';
      const startIndex = this.findNthOccurrence(html, imageUrlMarker, 10);
      
      if (startIndex !== -1) {
        const endIndex = html.indexOf('"', startIndex);
        const imageUrl = html.slice(startIndex, endIndex);
        // console.log(`URL 10. slike za model "${this.car.Model}": ${imageUrl}`);
        this.cars[i].imageUrl = imageUrl;
      } else {
        console.log('10. slika nije pronađena.');
        this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      }
    } catch (error) {
      console.error('Greška prilikom pretrage slika:', error);
      this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    }
  }
  
  // Define the findNthOccurrence function within the same class
  private findNthOccurrence(str: string, substr: string, n: number): number {
    let currentIndex = -1;
    for (let i = 0; i < n; i++) {
      currentIndex = str.indexOf(substr, currentIndex + 1);
      if (currentIndex === -1) {
        break;
      }
    }
    return currentIndex;
  }
  

}
