import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  _id: string;
  make: string;
  model: string;
  imageUrl: string[];
  features: string[];
  cartype: string;
  carCategory: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api/cars'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}`);
  }

  getCarsByType(carType: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/type/${carType}`);
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }
}