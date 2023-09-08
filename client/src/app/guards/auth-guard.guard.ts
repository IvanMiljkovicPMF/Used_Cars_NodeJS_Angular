import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service/auth.service'; 
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private cookie: CookieService, private authService:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.cookie.check('token')) {
        let token = this.cookie.get('token');
        return this.authService.validate(token);
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}