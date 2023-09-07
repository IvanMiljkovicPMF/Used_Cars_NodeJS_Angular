import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/user';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl='http://localhost:3000'
  constructor(private http:HttpClient,private cookie:CookieService) { }

  register(register:Login):Observable<any>{

    return this.http.post(`${this.backendUrl}/auth/register`,register,{responseType:'text'})
    
  }

  login(login:Login):Observable<any>{
    return this.http.post(`${this.backendUrl}/auth/login`,login,{responseType:'text'});
  }


  isAuthenticated(){
    if(this.cookie.get("token")){
        return true
    }
    return false;
  

  }
}
