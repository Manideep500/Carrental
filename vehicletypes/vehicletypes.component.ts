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
  today: string = new Date().toISOString().split('T')[0];//it wiill give current date
  returndate: string = '';
  categories: string[] = ['economy', 'premier', 'luxury'];
  selectcategory: string = '';
  carTypes: string[] = ['sedan', 'suv', 'honda', 'hyundai', 'force'];
  cars: Car[] = [];
  selectedCartype: string = '';
  selectcar: any = null;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    //load all cars when page load
    this.carService.getAvailableCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  checkreturndate() {
    const pickupd = new Date(this.pickupdate);
    const returnd = new Date(this.returndate);
    if (pickupd.getMonth() != returnd.getMonth()) {
      alert("Return date should not be more than 30 days");
      this.returndate = " ";
    }
  }

  formvalid() {
    return (
      this.selectlocation &&
      this.pickupdate &&
      this.returndate &&
      this.selectcategory &&
      this.selectedCartype
    );
  }

  oncategorychange() {
    // Show the first car in this category by default
    const filtered = this.cars.find(car => car.carCategory == this.selectcategory);
    this.selectcar = filtered;
  }

  
  //buttons should be enable basedon category and type
  isTypeEnabled(type: string): boolean {
    for (let car of this.cars) {
      if (car.carCategory === this.selectcategory && car.cartype === type) {
        return true;
      }
    }
    return false;
  }

  selectCarType(type: string) {
    this.selectedCartype = type;
    for (let car of this.cars) {
      if (car.carCategory === this.selectcategory && car.cartype === type) {
        this.selectcar = car;
        return;
      }
    }
    this.selectcar = null;
  }

  getTwoFeatures(features: string[] | undefined): string[] {
    return Array.isArray(features) ? features.slice(0, 2) : [];
  }

  public booknow() {

    this.sharedService.setCityAndCar(
      this.selectlocation,
      this.selectcar.make,
      this.selectcar.model,
      this.pickupdate,
      this.returndate
    );
    this.router.navigate(['/carlist']);

  }
}
