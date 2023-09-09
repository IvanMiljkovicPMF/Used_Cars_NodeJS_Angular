import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service/auth.service'; 
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor( private authService:AuthService,private router:Router, private cookie:CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      
      // todo promeniti da se proverava da li je admin
   if(this.cookie.get('role') === "ADMIN")
    {
      return true
    }
    this.router.navigate(['login']);
    return false;  
  }
  
}