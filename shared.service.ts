import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private city: string = '';
  private carname: string = '';
  private car1:string='';
  private pickupdate: string = '';
  private returndate: string = '';

  // Method to set both city and carname
  setCityAndCar(city: string, carname: string, car1:string, pickupdate:string, returndate:string): void {
    this.city = city;
    this.carname = carname;
    this.car1=car1;
    this.pickupdate = pickupdate;
    this.returndate = returndate;
  }

  // Method to get both city and carname
  getCityAndCar(): { city: string, carname: string, car1: string, pickupdate: string, returndate: string } {
    return {
      city: this.city,
      carname: this.carname,
      car1: this.car1,
      pickupdate: this.pickupdate,
      returndate: this.returndate
    };
  }
}