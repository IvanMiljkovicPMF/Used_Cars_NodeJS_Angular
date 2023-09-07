import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Login } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

email?:string;
password?:string;
username?:string;
  constructor(private authService:AuthService,private cookie:CookieService,private router:Router){}

  login(){

      const loginData:Login={username:this.username!,email:this.email!,password:this.password!}
 
      this.authService.login(loginData).subscribe({

        next:(res)=>{
          if(res){
            this.cookie.set("token",res);
            this.router.navigate(['home'])
          }
        },

        error:(err)=>{
          console.log(err);
        }

      })
    }

}
