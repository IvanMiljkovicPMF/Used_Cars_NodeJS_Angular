import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Cars } from 'src/app/models/cars';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private headers
  token: string = ''


  constructor(private httpClient: HttpClient,private cookie:CookieService) { 

    if (localStorage.getItem("token") !== null) {
      this.token =this.cookie.get("token")
    }

    if(this.token!==''){
      this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.token}`)
    }
  }
  getCarsForHome():Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/home`)
  }


  getCarsForPage(index: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/cars/${index}`)
  }

  getCarWithId(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/cars/car/${id}`)
  }

  getCarImage(model: string, brand: string, year:string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:3000/google-search?q=${model}+${brand}+${year}`)
  }

  addCar(car: Cars):Observable<any>{
    return this.httpClient.post<any>(`http://localhost:3000/profile/add`,
    {
      car: car
    },
    {
      headers: this.headers
    })
  }

  editCar(car:Cars):Observable<any>{
    return this.httpClient.put<any>(`http://localhost:3000/profile/edit`,
    {
      car: car
    },
    {
      headers: this.headers
    })
  }

  deleteCar(id:string):Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:3000/profile/delete/${id}`,
    {
      headers: this.headers
    })
  }

}
