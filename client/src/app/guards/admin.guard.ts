import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service/auth.service'; 


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor( private authService:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      
      // todo promeniti da se proverava da li je admin
   if(!this.authService.isAuthenticated())
    {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}