import { Component, OnInit } from '@angular/core';
import { Login, Register } from 'src/app/models/user'; 
import { AuthService } from 'src/app/services/auth.service/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service/cars.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService:AuthService,private cookie: CookieService,
    private router: Router,
    private carService: CarsService
    ){}



    ngOnInit() {
      this.registerForm = new FormGroup({
        'username': new FormControl('', Validators.required),
          'email': new FormControl('', Validators.required),
          'password': new FormControl('', Validators.required)
      });
  }

  register() {

    const registerData:Register=this.registerForm.value
           

    this.authService.register(registerData).subscribe({

      next:(token)=>{
        if(token){
          const getPayload=token.split('.')[1]
          const payload1=JSON.parse(atob(getPayload))
  
          console.log(payload1.role);
          
  
  
          const payload=JSON.parse(token)
  
          this.cookie.set("token",payload.token);
          this.carService.resetHeaders();
  
          this.router.navigate(['home'])
        }
       
      },
      error:(err)=>{
        console.log(err);
      }


    })



    }
   
}
