import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import axios from 'axios';
import { CarsService } from 'src/app/services/cars.service/cars.service';



@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.css']
})
export class SingleCarComponent {

  carId!: string
  car: any

  imageUrl: string = ''

  loading: boolean = true

  constructor(private route: ActivatedRoute,
    private carsService: CarsService
    ){

  }
  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.carId = params.get('id')!
    })
    // console.log(this.carId);
    this.getCarById()
  }

  getCarById(){
    this.loading = true
    this.carsService.getCarWithId(this.carId).subscribe({
      next: val=>{
        // console.log(val.car);
        this.car = val.car
        // console.log(this.car);
        
        this.loading = false

        const query = `${this.car.Model}+${this.car.Make}+${this.car.Year}`
        this.get10thCarImage(query)
      },
      error: err=>{
        alert(err)
        
      }
    })
  }

  async get10thCarImage(query: string): Promise<void> {
    try {
      const response = await axios.get(`http://localhost:3000/google-search/search?q=${query}&tbm=isch`);
      const html: string = response.data;
  
      // Find the 10th occurrence of the image URL string
      const imageUrlMarker = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9Gc';
      const startIndex = this.findNthOccurrence(html, imageUrlMarker, 10);
      
      if (startIndex !== -1) {
        const endIndex = html.indexOf('"', startIndex);
        this.imageUrl = html.slice(startIndex, endIndex);
        // console.log(`URL 10. slike za model "${this.car.Model}": ${this.imageUrl}`);
      } else {
        // console.log('10. slika nije pronađena.');
      }
    } catch (error) {
      console.error('Greška prilikom pretrage slika:', error);
    }
  }

  // Function to find the nth occurrence of a substring in a string
  findNthOccurrence(str: string, substr: string, n: number): number {
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
