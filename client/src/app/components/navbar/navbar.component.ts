import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // TODO get this from localStorage
  loggedIn: boolean = false;
  authSubscription!: Subscription; // Declare an auth subscription


  constructor(private authService:AuthService){}

  ngOnInit(){

      // Subscribe to the authentication status changes
      this.authSubscription = this.authService.authStatus.subscribe((status: boolean) => {
        this.loggedIn = status;
        console.log(status);
        
      });

    this.loggedIn = this.authService.isAuthenticated()
    console.log(this.loggedIn);
    


  }
  logOut(){
    this.authService.logOut()
    this.loggedIn = this.authService.isAuthenticated()
  }

  ngOnDestroy() {
    // Unsubscribe from the auth subscription to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

}
