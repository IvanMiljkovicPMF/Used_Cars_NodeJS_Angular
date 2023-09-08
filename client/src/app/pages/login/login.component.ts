import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Login } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


loginForm!: FormGroup; 
    
constructor(private authService:AuthService,private cookie:CookieService,private router:Router){}

ngOnInit() {
    this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
}

login(){

  const loginData:Login=this.loginForm.value
 
  this.authService.login(loginData).subscribe({
  next:(res)=>{
    if(res){
       this.cookie.set("token",res);
       this.router.navigate(['home'])
      }
  },

    error:(err)=>{ console.log(err);}})
}

//

}
