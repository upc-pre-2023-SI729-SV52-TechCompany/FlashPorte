import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})

export class ToolbarClientComponent {

  userFullName = 'User Full Name';

  constructor(private router: Router) { }

  pageHome(){
    this.router.navigateByUrl('https://upc-pre-2023-si729-sv52-techcompany.github.io/LandingPage-V1/#about');
  }

  pageProfile(){
    this.router.navigateByUrl('/profile-client/:id');
  }

  pageSearchVehicles(){
    this.router.navigateByUrl('/searchvehicle/:id');
  }

  pageContracts(){
    this.router.navigateByUrl('/contracts/:id');
  }

  pageSupport(){
    this.router.navigateByUrl('/supportclient');
  }

  pageLogOut(){
    this.router.navigateByUrl('login');
  }
}
