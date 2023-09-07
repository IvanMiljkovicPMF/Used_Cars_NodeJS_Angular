import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // TODO get this from localStorage
  loggedIn: boolean = true;

  constructor(private authService:AuthService){

  }
  onInit(){

  }
  logOut(){
    this.authService.login("ivan@gmail.com","ivan123").subscribe({
      next:val=>{
        alert("uspesno")
        console.log(val);
        localStorage.setItem("token",val.token)
        console.log(localStorage.getItem("token"));
        
      },
      error:err=>{
        alert("neuspesno")
      }
    })
  }

}
