import { Component } from '@angular/core';
import { Client } from "../../../models/client.model";
import { Contract } from "../../../models/contract.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';
import {tap} from "rxjs";

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent {
  company: any = '';
  clientData!: Client;
  clients: any[] = [];
  contracts: Contract[] = [];

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
      this.getAllContracts();
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

  getAllContracts() {
    this.companyDataService.getAllContracts().subscribe((res: Contract[]) => {
      const companyId = this.company.id;
      this.contracts = res.filter(contract => contract.companyId === companyId);
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

  getContractClientPhoto(contract: Contract) {
    const client = this.clients.find(c => c.id === contract.clientId);
    console.log('Client:', client);
    return client ? client.photo : '';
  }

  getContractClientName(contract: Contract) {
    const client = this.clients.find(c => c.id === contract.clientId);
    console.log('Client:', client);
    return client ? client.fullname : '';
  }
}
