import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pizza} from '../models/pizza'
@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiUrl = 'http://localhost:3000/api/v1/pizzas';
  constructor() { }
  private http = inject(HttpClient)
  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getPizzaById(id: any): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`);
  }


}
