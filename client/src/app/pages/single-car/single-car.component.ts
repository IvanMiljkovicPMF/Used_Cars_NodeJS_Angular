import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service/auth.service';
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
  loggedIn: boolean = false

  loading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router,
    private cookie:CookieService,
    private authService: AuthService
    ){

  }
  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.carId = params.get('id')!
    })
    // console.log(this.carId);
    this.loggedIn = this.authService.isAuthenticated()


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
        this.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

      }
    } catch (error) {
      this.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";

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

  checkIfVendor(){
    if(this.cookie.get('role') === "VENDOR")
    {
      return true
    }
    return false;  
  }
  buyCar(){
    if (window.confirm("Are you sure you want to buy this car?")) {
      this.carsService.deleteCar(this.carId).subscribe({
        next:val=>{
          
          this.router.navigate([`ads`])
          alert("You have bought a car!")
        },
        error:err=>{
          console.log(err);
        }
      })
  } else {
      
    }
  }

  openLink() {
    // log
    const externalUrl = `https://www.google.com/search?q=${this.car.Model}`;
    window.open(externalUrl, '_blank'); // '_blank' opens the link in a new tab/window
  }

}
