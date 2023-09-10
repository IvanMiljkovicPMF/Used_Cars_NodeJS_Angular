import { Component } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service/cars.service';
import {Router} from '@angular/router';

import axios from 'axios';
import { Cars, Companies } from 'src/app/models/cars';
import { fadeInOutAnimation } from './animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOutAnimation],
})
export class HomeComponent {

  rangeValues: [number,number] = [12000, 50000];

  bestCars: any[] = []

  loading: boolean = true;

  year!: number 
  model: string = ''
  make: string = ''



  leftPointerForBestBuy: number = 0;
  rightPointerForBestBuy: number = 3;
  totalNumberForBestBuy: number = 0;
  bestBuyToDisplay: Cars[] = []

  leftPointerForCompanies: number = 0;
  rightPointerForCompanies: number = 2;
  companiesToDisplay: Companies[] = []
  companies: Companies[] =[
    {
      name: 'Toyota',
      imageUrl: 'https://www.freepnglogos.com/uploads/toyota-logo-png/toyota-logos-brands-logotypes-0.png',
      description: 'Toyota is a well-known car manufacturer.'
    },
    {
      name: 'Honda',
      imageUrl: 'https://logohistory.net/wp-content/uploads/2023/01/Honda-Logo.svg',
      description: 'Honda produces reliable and efficient vehicles.'
    },
    {
      name: 'Ford',
      imageUrl: 'https://1000logos.net/wp-content/uploads/2018/02/Ford-Logo.png',
      description: 'Ford is known for its wide range of cars and trucks.'
    },
    {
      name: 'Volkswagen',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Volkswagen_Logo_till_1995.svg/2048px-Volkswagen_Logo_till_1995.svg.png',
      description: 'Volkswagen is a popular German automaker.'
    },
    {
      name: 'BMW',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png',
      description: 'BMW produces luxury and high-performance vehicles.'
    },
    {
      name: 'Mercedes-Benz',
      imageUrl: 'https://logohistory.net/wp-content/uploads/2023/01/Mercedes-Benz-Logo.png',
      description: 'Mercedes-Benz is a leading luxury car brand.'
    },
    {
      name: 'Tesla',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      description: 'Tesla is known for its electric and autonomous vehicles.'
    },
    {
      name: 'Chevrolet',
      imageUrl: 'https://1000logos.net/wp-content/uploads/2019/12/Chevrolet-Logo-2010.png',
      description: 'Chevrolet offers a variety of cars and trucks.'
    },
  ]

  cars: any[] = []
  currentPage:any
  totalCars!:number
  brojac: number = 625;
  
  constructor(private carsService:CarsService, private router: Router){

  }

  ngOnInit(){
    this.getCars()
    
    this.setCompaniesToDisplay()
    setInterval(() => {
      this.moveCompaniesRight();
    }, 3000);

  }

  navigateToAds(){ 
    this.router.navigate(['/ads'],{ queryParams: {
      model: this.model !== '' ? this.model : undefined,
      year: this.year, 
      make: this.make  !== '' ? this.make : undefined,
      minPrice: this.rangeValues[0],
      maxPrice: this.rangeValues[1]
    }})
  }

  setCompaniesToDisplay(){
    for(let i =0;i<3;i++){
      this.companiesToDisplay.push(this.companies[i])
    }
  }

  setBestBuyToDisply(){
    for(let i=0;i<4;i++){
      this.bestBuyToDisplay.push(this.bestCars[i])
    }
  }

  moveBestBuyLeft(){
    this.bestBuyToDisplay.pop()
    this.leftPointerForBestBuy--
    this.rightPointerForBestBuy--

    if(this.leftPointerForBestBuy < 0){
      this.leftPointerForBestBuy=this.totalNumberForBestBuy-1
    }
    if(this.rightPointerForBestBuy < 0){
      this.rightPointerForBestBuy=this.totalNumberForBestBuy-1
    }

    this.bestBuyToDisplay.unshift(this.bestCars[this.leftPointerForBestBuy])

  }
  moveBestBuyRight(){
    this.bestBuyToDisplay.shift()
    this.leftPointerForBestBuy++
    this.rightPointerForBestBuy++

    if(this.rightPointerForBestBuy > this.totalNumberForBestBuy-1){
      this.rightPointerForBestBuy=0
    }
    if(this.leftPointerForBestBuy > this.totalNumberForBestBuy-1){
      this.leftPointerForBestBuy=0
    }


    this.bestBuyToDisplay.push(this.bestCars[this.rightPointerForBestBuy])

  }

  moveCompaniesLeft(){
    this.companiesToDisplay.pop()
    this.leftPointerForCompanies--
    this.rightPointerForCompanies--;

    if(this.rightPointerForCompanies < 0){
      this.rightPointerForCompanies=7
    }
    if(this.leftPointerForCompanies < 0){
      this.leftPointerForCompanies=7
    }

    this.companiesToDisplay.unshift(this.companies[this.leftPointerForCompanies])
  }
  moveCompaniesRight(){
    this.companiesToDisplay.shift()
    this.leftPointerForCompanies++;
    this.rightPointerForCompanies++;

    if(this.rightPointerForCompanies > 7){
      this.rightPointerForCompanies=0
    }
    if(this.leftPointerForCompanies > 7){
      this.leftPointerForCompanies=0
    }

    this.companiesToDisplay.push(this.companies[this.rightPointerForCompanies])
  }

  logCars(){
    // console.log(this.cars);
  }

  // 626 je max

  //TODO: bearer token!!!!!!!!


  getCars(){
    this.loading = true
    this.carsService.getCarsForHome().subscribe({
      next:val=>{
        this.cars = []
        this.bestCars=[]
        // console.log(val);

        for(let i=0;i<val.newCars.length;i++){
          
          this.cars.push(val.newCars[i])
          // this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

          this.get10thCarImage(false,i)
        }
        for(let i=0; i<val.bestBuy.length;i++){
          this.bestCars.push(val.bestBuy[i])
          // this.bestCars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

          this.get10thCarImage(true,i)
        }
        this.setBestBuyToDisply()


        this.totalNumberForBestBuy=val.bestBuy.length
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
  async get10thCarImage(best:boolean,i: number): Promise<void> {

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

        if(best){
          this.bestCars[i].imageUrl = imageUrl;

        }
        else{
          this.cars[i].imageUrl = imageUrl;
        }
      } else {
        // console.log('10. slika nije pronađena.');
        if(best){
          this.bestCars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        }
        else{
        this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        }
      }
    } catch (error) {
      console.error('Greška prilikom pretrage slika:', error);
      if(best){
        this.bestCars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

      }
      else{
      this.cars[i].imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
      }  
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
