import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Companies } from 'src/app/models/cars';
import { CarsService } from 'src/app/services/cars.service/cars.service';

import axios from 'axios';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-cars-adds',
  templateUrl: './cars-adds.component.html',
  styleUrls: ['./cars-adds.component.css']
})
export class CarsAddsComponent {

  rangeValues: [number,number] = [12000, 50000];

  loading: boolean = true;

  cars: any[] = []
  currentPage:number = 1
  totalCars!:number
  brojac: number = 625;
  
  year!:number
  model: string =''
  make: string =''

  query: string = ''
  

  constructor(
    private carsService:CarsService, 
    private router: Router,
    private route: ActivatedRoute
    ){

  }

  ngOnInit(){
    const queryParams = this.route.snapshot.queryParamMap;

    const model = queryParams.has('model') ? queryParams.get('model') : '';
    const year = queryParams.has('year') ? queryParams.get('year') : '';
    const make = queryParams.has('make') ? queryParams.get('make') : '';
    const minPrice = queryParams.has('minPrice') ? queryParams.get('minPrice') : '';
    const maxPrice = queryParams.has('maxPrice') ? queryParams.get('maxPrice') : '';

    // Create a new HttpParams object
    let params = new HttpParams();

    // Add query parameters if they have values
    if (model) {
      params = params.set('model', model);
    }

    if (year) {
      params = params.set('year', year);
    }

    if (make) {
      params = params.set('make', make);
    }

    if (minPrice) {
      params = params.set('minPrice', minPrice.toString());
    }

    if (maxPrice) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    // Convert the HttpParams object to a string
    const queryString = params.toString();

    if(queryString){
      // console.log(queryString);
      console.log(queryString);
      this.query = queryString
      
      this.getCarsWithParams( this.currentPage, queryString)
    }
    else{
      this.getCars( this.currentPage)
    }
  }

  logCars(){
    // console.log(this.cars);
  }

  getCarsParams(){
    // Create a new HttpParams object
    let params = new HttpParams();

    // Add query parameters if they have values
    if (this.model) {
      params = params.set('model', this.model);
    }

    if (this.year) {
      params = params.set('year', this.year);
    }

    if (this.make) {
      params = params.set('make', this.make);
    }

    params = params.set('minPrice', this.rangeValues[0].toString());
    params = params.set('maxPrice', this.rangeValues[1].toString());
  

    // Convert the HttpParams object to a string
    const queryString = params.toString();

    this.query = queryString


    // console.log(queryString);
    this.currentPage =1;
    this.getCarsWithParams( this.currentPage, queryString)
    
  }
  // 626 je max

  //TODO: bearer token!!!!!!!!
  getCarsWithParams(index:number,query: string){
    this.loading = true
    this.carsService.getCarsForPageWithParams(index,query).subscribe({
      next:val=>{
        this.cars = []
        console.log(val);
       
        for(let i=0;i<val.cars.length;i++){
          this.cars.push(val.cars[i])
          this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";


          // this.get10thCarImage(i)
          
        }
        this.totalCars=val.total
        this.loading = false;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }


  changePage(event:any){
    this.currentPage = event.page + 1; 
    if(this.query){
      this.getCarsWithParams(this.currentPage,this.query);

    }
    else{
      this.getCars(this.currentPage);
    }
  }

  getCars(index:number){
    this.loading = true
    this.carsService.getCarsForPage(index).subscribe({
      next:val=>{
        this.cars = []
        // console.log(val);
       
        for(let i=0;i<val.cars.length;i++){
          this.cars.push(val.cars[i])
          this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";


          // this.get10thCarImage(i)
          
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
    // console.log(query);

    
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
        // console.log('10. slika nije pronađena.');
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
