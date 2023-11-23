import { Component, OnInit } from "@angular/core";
import { Contract } from "../../../models/contract.model";
import { Company } from "../../../models/company.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts-client.component.html',
  styleUrls: ['./contracts-client.component.css']
})
export class ContractsClientComponent implements OnInit {
  company: any = '';
  clientContracts: Contract[] = [];
  acceptedContracts: Contract[] = [];
  rejectedContracts: Contract[] = [];

  constructor(private activatedRoute: ActivatedRoute, private api: FastporteDataService, private companyDataService: FastporteDataService) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
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

  ngOnInit() {
    const clientId = this.activatedRoute.snapshot.params['id'];

    this.api.getAllContracts().subscribe((contracts: Contract[]) => {
      this.clientContracts = contracts.filter(contract => contract.clientId === clientId);
      this.acceptedContracts = this.clientContracts.filter(contract => contract.estado === 'Aceptado' || contract.estado === 'Finalizado');
      this.rejectedContracts = this.clientContracts.filter(contract => contract.estado === 'Cancelado' || contract.estado === 'Rechazado');
    });
  }

  finalizarReserva(contract: Contract) {
    contract.estado = 'Finalizado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }

  cancelarReserva(contract: Contract) {
    contract.estado = 'Cancelado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }

  rechazarCosto(contract: Contract) {
    contract.estado = 'Rechazado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }

  aceptarCosto(contract: Contract) {
    contract.estado = 'Aceptado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }

}
