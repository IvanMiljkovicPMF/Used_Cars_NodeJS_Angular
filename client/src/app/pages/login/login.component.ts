import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Login } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


loginForm!: FormGroup; 
    
constructor(private authService:AuthService,private cookie:CookieService,private router:Router,private carService:CarsService){}

ngOnInit() {
    this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
}

login(){

  const loginData:Login=this.loginForm.value
 
  this.authService.login(loginData).subscribe({
  next:(token)=>{
    if(token){
      const getPayload=token.split('.')[1]
      const payload1=JSON.parse(atob(getPayload))
      const payload=JSON.parse(token)
      
       this.cookie.set("token",payload.token);
       this.carService.resetHeaders();
       this.router.navigate(['home'])
      }
  },

    error:(err)=>{ console.log(err);}})
}

//

}
