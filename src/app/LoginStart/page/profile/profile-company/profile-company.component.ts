import { Component, OnInit } from '@angular/core';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';
import {tap} from "rxjs";
import {Review} from "../../../models/review.model";
import {Client} from "../../../models/client.model";

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css'],
})
export class ProfileCompanyComponent implements OnInit  {
    company: any = '';
    clientData!: Client;
    clients: any[] = [];
    reviews: Review[] = [];
  errorMessage: string = '';
  showPersonalInformation: boolean = true;
  showExperience: boolean = false;
  showAboutVehicle: boolean = false;
  showComments: boolean = false;

  constructor(private companyDataService: FastporteDataService, private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
        params => {
          this.getCompany(params['id']);
        }
    );
      this.clientData = {} as Client;
  }
    ngOnInit(): void {
        /*this.getAllClients();
        this.getAllContracts();*/
        this.getAllClients().subscribe(() => {
            this.getAllReviews();
        });
    }

    getAllClients() {
        /*this.clientDataService.getAllClients().subscribe((res: any) => {
          this.clients = res;
        });*/
        return this.clientDataService.getAllClients().pipe(
            tap((res: any) => {
                this.clients = res; // Asigna los datos de los clientes al arreglo 'clients'
            })
        );
    }

    getAllReviews() {
        this.companyDataService.getAllReviews().subscribe((res: Review[]) => {
            const companyId = this.company.id;
            this.reviews = res.filter(review => review.companyId === companyId);
        });
    }

    getCompany(id: any) {
        this.companyDataService.getCompanyById(id).subscribe(
            (res: any) =>
            {
                console.log("Company detail:", (res[id-1]));
                this.company = res[id-1];
            },
            err => {
                console.log("Error:", err);
            }
        );
    }

  pageSettings() {
    const companyId = this.company.id;
    this.router.navigateByUrl(`/company-settings/${companyId}`);
  }

  showSection(section: string) {
    this.showPersonalInformation = section === 'PersonalInformation';
    this.showExperience = section === 'Experience';
    this.showAboutVehicle = section === 'AboutVehicle';
    this.showComments = section === 'Comments';
  }
}
