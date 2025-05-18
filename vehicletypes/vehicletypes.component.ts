import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CarService, Car } from '../services/car.service';

@Component({
  selector: 'app-vehicletypes',
  templateUrl: './vehicletypes.component.html',
  styleUrls: ['./vehicletypes.component.css']
})
export class VehicletypesComponent implements OnInit {
  locations: string[] = ["Banglore", "Chennai", "Hyderbad", "Mumbai"];
  selectlocation: string = '';
  pickupdate: string = '';
  today: string = new Date().toISOString().split('T')[0];
  returndate: string = '';
  categories: string[] = ['economy', 'premier', 'luxury'];
  selectcategory: string = '';
  carTypes: string[] = ['sedan', 'suv', 'honda', 'hyundai', 'force'];
  cars: Car[] = [];
  selectedCartype: string = '';
  displayCar: Car | null = null;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.carService.getAvailableCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  formvalid() {
    return (
      this.selectlocation &&
      this.pickupdate &&
      this.returndate &&
      this.selectcategory && 
      this.selectedCartype &&
      this.displayCar
    );
  }

  oncategorychange() {
    this.selectedCartype = '';
    // Show the first car in this category by default
    const firstCar = this.cars.find(car => car.carCategory === this.selectcategory);
    this.displayCar = firstCar ? firstCar : null;
  }

  isTypeEnabled(type: string): boolean {
    return !!this.cars.find(
      car => car.carCategory === this.selectcategory && car.cartype === type
    );
  }

  selectCarType(cartype: string) {
    this.selectedCartype = cartype;
    const filtered = this.cars.filter(
      car => car.carCategory === this.selectcategory && car.cartype === cartype
    );
    this.displayCar = filtered.length > 0 ? filtered[0] : null;
  }

  getTwoFeatures(features: string[] | undefined): string[] {
    return Array.isArray(features) ? features.slice(0, 2) : [];
  }

  public booknow() {
    if (this.displayCar) {
      this.sharedService.setCityAndCar(
        this.selectlocation,
        this.displayCar.make,
        this.displayCar.model,
        this.pickupdate,
        this.returndate
      );
      this.router.navigate(['/carlist']);
    }
  }
}