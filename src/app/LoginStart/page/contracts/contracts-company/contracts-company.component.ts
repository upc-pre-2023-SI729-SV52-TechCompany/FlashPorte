import { Component, OnInit } from "@angular/core";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from "rxjs";
import {Contract} from "../../../models/contract.model";
import {Client} from "../../../models/client.model";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts-company.component.html',
  styleUrls: ['./contracts-company.component.css']
})
export class ContractsCompanyComponent implements OnInit {
  company: any = '';
  clientData!: Client;
  clients: any[] = [];
  contracts: Contract[] = [];
  acceptedContracts: Contract[] = [];
  rejectedContracts: Contract[] = [];
  showAcceptForm = false; // Variable para mostrar/ocultar el formulario de aceptación
  costoDelServicio: number = 0;

  constructor(private companyDataService: FastporteDataService, private api: FastporteDataService, private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
    this.clientData = {} as Client;
  }

  showAcceptModal(contract: Contract) {
    // Implementation of the method
  }

  cancelarAceptacion() {
    // Implementation of the method
  }

  aceptarContrato(contract: Contract) {
    if (this.costoDelServicio > 0) {
      contract.costoServicio = this.costoDelServicio;

      // Llama a la función de actualización en el servicio
      this.api.updateContracts(contract.id, contract).subscribe(
        (response) => {
          console.log('Contrato actualizado con el costo del servicio:', response);
        },
        (error) => {
          console.log('Error al actualizar el contrato:', error);
        }
      );
      this.costoDelServicio = 0;
      this.showAcceptForm = false;
    } else {
      console.log('El costo del servicio no es válido.');
    }
  }

  rechazarContrato(contract: Contract) {
    // Verificar si el contrato ya está en la lista de contratos rechazados
    const isAlreadyRejected = this.rejectedContracts.includes(contract);

    if (!isAlreadyRejected) {
      // Elimina el contrato de la lista de contratos activos
      const index = this.contracts.findIndex(c => c.id === contract.id);
      if (index !== -1) {
        this.contracts.splice(index, 1);
      }

      // Agrega el contrato a la lista de contratos rechazados
      this.rejectedContracts.push(contract);
    }
    // Si ya está en la lista de contratos rechazados, no hacemos nada
  }

  ngOnInit(): void {
    this.getAllClients().subscribe(() => {
      this.getAllContracts();
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
}
