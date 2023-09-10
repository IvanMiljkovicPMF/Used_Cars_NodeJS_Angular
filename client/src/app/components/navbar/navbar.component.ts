import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { CarsService } from 'src/app/services/cars.service/cars.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  items: MenuItem[] | undefined;


  // TODO get this from localStorage
  loggedIn: boolean = false;
  authSubscription!: Subscription; // Declare an auth subscription
  currentRoute!: string;
  activatedRoute: any;


  constructor(
    private authService:AuthService,
    private router: Router,
    private carsService:CarsService,
    private cookie:CookieService
    ){
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      });
    }

  ngOnInit(){

      // Subscribe to the authentication status changes
      this.authSubscription = this.authService.authStatus.subscribe((status: boolean) => {
        this.loggedIn = status;
        // console.log(status);
        
      });
    


    this.loggedIn = this.authService.isAuthenticated()
    // console.log(this.loggedIn);
    



    this.items = [
      {
          label: 'Cars Portal',
          items: [
              {
                  label: 'All cars',
                  command: () => {
                      this.router.navigate([`cars-portal`])
                    }
              },
              {
                  label: 'Add car',
                  command: () => {
                      this.router.navigate([`add-car`])
                    }
              },
          ]
      },
      {
        label: 'Users Portal',
        items: [
            {
                label: 'All users',
                command: () => {
                    this.router.navigate([`users-portal`])
                  }
            },
            {
                label: 'Add user',
                command: () => {
                    this.router.navigate([`add-user`])
                  }
                
            },
        ]
    },
  ];

  }
  logOut(){
    this.authService.logOut()
    this.loggedIn = this.authService.isAuthenticated()
    this.carsService.resetHeaders()
    this.cookie.delete("role")
    this.router.navigate([`home`])

  }

  ngOnDestroy() {
    // Unsubscribe from the auth subscription to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  checkIfAdmin(){
    if(this.cookie.get('role') === "ADMIN")
    {
      return true
    }
    return false;  
  }

}
