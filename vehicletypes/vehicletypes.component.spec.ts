import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CarService } from '../services/car.service';

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
  cars: any[] = [];
  categories: string[] = ['economy', 'premier', 'luxury'];
  selectcategory: string = '';
  filteredcars: any[] = [];
  selectedcars: any = null;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  async loadCars() {
    try {
      // Fetch all available cars from backend
      const cars = await this.carService.getAvailableCars().toPromise();
      
      // Transform data for frontend
      this.cars = cars.map(car => ({
        _id: car._id,
        name: car.make, // Using make as the display name
        category: car.carCategory,
        Model: car.model,
        Luggage: car.features[2],
        milage: car.features[1],
        photo: car.imageUrl[0], // Using first image
        Refund: car.features[3],
        cartype: car.cartype
      }));
      
      if (this.cars.length > 0) {
        this.selectedcars = this.cars[0];
      }
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  }

  formvalid() {
    return (this.selectlocation && this.pickupdate && this.returndate && this.selectcategory);
  }

  oncategorychange() {
    this.filteredcars = this.cars.filter(car => car.category === this.selectcategory);
    this.selectedcars = this.filteredcars[0] || null;
  }

  selectcar(car: any) {
    this.selectedcars = car;
  }

  booknow() {
    this.sharedService.setCityAndCar(
      this.selectlocation,
        this.displayCar.make,
        this.displayCar.model, // Pass model as car1
        this.pickupdate,
        this.returndate
    );
    this.router.navigate(['/carlist']);
  }
}