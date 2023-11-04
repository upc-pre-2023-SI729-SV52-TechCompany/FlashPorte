import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatMenu } from '@angular/material/menu';
import {FastporteDataService} from "../../../../services/fastporte-data.service";

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.css']
})

export class ToolbarClientComponent {

  client: any = '';

  constructor(private clientDataService: FastporteDataService, private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getClient(params['id']);
      }
    );
  }

  getClient(id: any) {
    this.clientDataService.getClientById(id).subscribe(
      (res: any) =>
      {
        console.log("Client detail:", (res[id-1]));
        this.client = res[id-1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }

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
