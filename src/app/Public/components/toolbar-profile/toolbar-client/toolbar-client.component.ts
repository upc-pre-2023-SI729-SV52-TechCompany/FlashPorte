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
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/home-client/${clientId}`);
  }

  pageProfile() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/profile-client/${clientId}`);
  }

  pageSearchVehicles() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/search-vehicle/${clientId}`);
  }

  pageContracts() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/contracts/${clientId}`);
  }

  pageSupport() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/support-client/${clientId}`);
  }

  pageLogOut() {
    this.router.navigateByUrl('login');
  }
}
