import { Component,OnInit} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicletypes',
  templateUrl: './vehicletypes.component.html',
  styleUrls: ['./vehicletypes.component.css']
})
export class VehicletypesComponent {
  cars:any[]= [
    {  name: 'SUV', Model: 2023, Luggage: '2 bags', milage:30, photo: '/assets/Suv1.jpeg' },
    {  name: 'Seaden', Model: 2022, Luggage: '6 bags',milage:20, photo: '/assets/sedan.jpg' },
    {  name: 'Hyundai', Model: 2021, Luggage: '3 bags',milage:25, photo: '/assets/Hyundai.webp'},
    {  name: 'Honda', Model: 2020, Luggage: '4 bags',milage:35, photo: '/assets/honda.jfif' },
    {  name: 'Tempo', Model: 2016, Luggage: '6 bags',milage:40, photo: '/assets/Tempo1.jpg' }
  ];
  selectedcars:any=this.cars[0];
  locations:string[]=["Banglore","Chennai","Hyderbad","Mumbai"];
  selectlocation:string='';
  pickupdate:string=''; //we need to type here yyyy-mm-dd format
  today:string=new Date().toISOString().split('T')[0];
  returndate:string='';
  constructor(private router:Router)
  {

  }
public selectcar(car:any)
{
  this.selectedcars=car;
}
formvalid()
{
  
  return (this.selectlocation &&
  this.pickupdate &&
  this.returndate 
);}

public booknow()
{
  console.log("selectedlocation is:"+this.selectlocation);
  this.router.navigate(['/carlist'])
}
}
