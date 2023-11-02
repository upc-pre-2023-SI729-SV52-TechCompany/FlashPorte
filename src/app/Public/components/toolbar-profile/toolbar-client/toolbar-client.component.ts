import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})

export class ToolbarClientComponent {

  userFullName = 'User Full Name';

  constructor(private router: Router, private route: ActivatedRoute) { }

  pageHome() {
    this.router.navigateByUrl('https://upc-pre-2023-si729-sv52-techcompany.github.io/LandingPage-V1/#about');
  }

  pageProfile() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/profile-client/${clientId}`);
  }

  pageSearchVehicles() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/searchvehicle/${clientId}`);
  }

  pageContracts() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/contracts/${clientId}`);
  }

  pageSupport() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/supportclient/${clientId}`);
  }

  pageLogOut() {
    this.router.navigateByUrl('login');
  }
}
