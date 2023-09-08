import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers
  token: string = ''

  constructor(private httpClient: HttpClient,private cookie:CookieService) { 

    if(this.cookie.get("token")){
      this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.cookie.get("token")}`)
    }
  }

  resetHeaders()
  {
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.cookie.get("token")}`)
  }

  getUsers():Observable<any>{   
    return this.httpClient.get<any>('http://localhost:3000/users',
    {
      headers:this.headers
    })
  }

  getUserById(id:string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:3000/users/${id}`,
    {
      headers:this.headers
    })
  }

  deleteUser(id:string):Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:3000/users/${id}`,
    {
      headers:this.headers
    })
  }

  editUser():Observable<any>{
    return this.httpClient.put<any>(`http://localhost:3000/users`,
    {
      // Todo ovde user
    },
    {
      headers:this.headers
    })
  }

  addUser():Observable<any>{
    return this.httpClient.post<any>(`http://localhost:3000/users`,
    {
      // Todo ovde user
    },
    {
      headers:this.headers
    })
  }

}
