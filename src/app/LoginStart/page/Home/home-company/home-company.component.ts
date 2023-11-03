import { Component } from '@angular/core';
import { Client } from "../../../models/client.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent {
  company: any = '';
  clientData!: Client;
  clients: any[] = [];

  constructor(private companyDataService: FastporteDataService, private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
    this.clientData = {} as Client;
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clientDataService.getAllClients().subscribe((res: any) => {
      this.clients = res; // Asigna los datos de los clientes al arreglo 'clients'
    });
  }

  getCompany(id: any) {
    this.companyDataService.getCompanyById(id).subscribe(
      (res: any) => {
        console.log("Company detail:", (res[id - 1]));
        this.company = res[id - 1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }
}
