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
        // console.log(val);
        this.car = val
        this.loading = false
      },
      error: err=>{
        alert(err)
        
      }
    })
  }


  // carModel = 'Tesla Model 3';
  // imageUrl: string | null = null;

  // constructor() {
  //   this.searchImage(this.carModel);
  // }

  // async searchImage(query: string): Promise<void> {
  //   try {
  //     const response = await axios.get(`https://www.google.com/search?q=${query}&tbm=isch`);
  //     const html: string = response.data;
  //     const startIndex: number = html.indexOf('"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9Gc') + 1;
  //     const endIndex: number = html.indexOf('"', startIndex + 1);
  //     this.imageUrl = html.slice(startIndex, endIndex);
  //     console.log(`URL prve slike za model "${this.carModel}": ${this.imageUrl}`);
  //   } catch (error) {
  //     console.error('Greška prilikom pretrage slika:', error);
  //   }
  // }



}
