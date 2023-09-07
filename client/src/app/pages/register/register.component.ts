import { Component } from '@angular/core';
import { Login } from 'src/app/models/user'; 
import { AuthService } from 'src/app/services/auth.service/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  username?:string
  email?:string;
  password?:string;

  constructor(private authService:AuthService,private cookie: CookieService,
    private router: Router){}

  register() {

    const registerData:Login={username:this.username!,
            email:this.email!,password:this.password!};

    this.authService.register(registerData).subscribe({

      next:(res)=>{
        if(res){
          this.cookie.set("token", res);
          this.router.navigate(['home']);
        }
       
      },
      error:(err)=>{
        console.log(err);
      }


    })



    }
   
}
