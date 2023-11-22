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
  popularClients: any[] = [];

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
      this.getPopularClients();
    });
  }

  getAllClients() {
    return this.clientDataService.getAllClients().pipe(
        tap((res: any) => {
          this.clients = res;
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

  getPopularClients() {
    // Obtener dos conductores populares al azar
    this.popularClients = this.getRandomElements(this.clients, 2);
  }

  getRandomElements(arr: any[], numElements: number): any[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }
}
