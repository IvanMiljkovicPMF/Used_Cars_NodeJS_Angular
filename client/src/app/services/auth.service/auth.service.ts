import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators'; // Import the map operator


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl='http://localhost:3000'

  private authStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Expose the authStatus as an Observable
  authStatus: Observable<boolean> = this.authStatusSubject.asObservable();



  constructor(private http:HttpClient,private cookie:CookieService) { }

  register(register:Login):Observable<any>{

    return this.http.post(`${this.backendUrl}/auth/register`,register,{responseType:'text'})
    
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.backendUrl}/auth/login`, login, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Assuming your login API sets the token cookie upon successful login
        if (response) {
          this.authStatusSubject.next(true); // Notify subscribers that the user is logged in
          console.log("uso sam ovde");
          
        }      
        return response;
      })
    );
  }

  validate(token: string) : Observable<boolean>
  {
    let headers = new HttpHeaders().set("Authorization", "Bearer "+ token);
    return this.http.post<boolean>(`${this.backendUrl}/auth/validate`, {}, {headers:headers});
  }
  isAuthenticated(){
    if(this.cookie.get("token")){
        return true
    }
    return false;
  

  }
  logOut(){
    this.cookie.delete("token")
    this.authStatusSubject.next(false); // Notify subscribers that the user is logged out
  }

}
