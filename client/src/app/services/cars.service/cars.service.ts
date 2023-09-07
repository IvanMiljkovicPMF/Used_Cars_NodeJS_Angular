import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) { }

  getCarsForPage(index: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/cars/${index}`)
  }

  getCarWithId(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/cars/car/${id}`)
  }
}
