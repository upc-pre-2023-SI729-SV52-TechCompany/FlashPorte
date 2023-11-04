import { Component, OnInit } from '@angular/core';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css'],
})
export class ProfileClientComponent implements OnInit  {
    client: any = '';
  constructor(private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
        params => {
          this.getClient(params['id']);
        }
    );
  }
    ngOnInit(): void {
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
    pageSettings() {
    const clientId = this.client.id;
    this.router.navigateByUrl(`/client-settings/${clientId}`);
  }
}
