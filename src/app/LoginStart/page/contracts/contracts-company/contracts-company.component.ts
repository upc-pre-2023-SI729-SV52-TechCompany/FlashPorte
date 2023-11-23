import { Component, OnInit } from "@angular/core";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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
  currentContract: Contract | null = null;
  clientData!: Client;
  clients: any[] = [];
  contracts: Contract[] = [];
  acceptedContracts: Contract[] = [];
  rejectedContracts: Contract[] = [];
  showAcceptForm = false; // Variable para mostrar/ocultar el formulario de aceptación
  costoDelServicio: number = 0;

  constructor(private companyDataService: FastporteDataService, private api: FastporteDataService, private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
    this.clientData = {} as Client;
  }

  showAcceptModal(contract: Contract) {
    this.currentContract = contract;
    this.showAcceptForm = true;
  }
  cancelarAceptacion() {
    // Limpiar el contrato actual al cancelar la aceptación
    this.currentContract = null;
    // Lógica para cancelar la aceptación
    this.showAcceptForm = false;
  }

    aceptarContrato() {
        if (this.currentContract) {
            this.currentContract.estado = 'Programado';

            // Log the value of costoDelServicio for debugging
            console.log('Costo del Servicio before update:', this.costoDelServicio);
            this.currentContract.costoServicio = this.costoDelServicio;

            // Update the contract in the API
            this.api.updateContracts(this.currentContract.id, this.currentContract).subscribe(() => {
                // Log a message indicating that the API update is successful
                console.log('Contract updated successfully');

                this.getAllContracts();
                const index = this.contracts.findIndex(contract => contract.id === this.currentContract?.id);
                if (index !== -1) {
                    this.contracts[index].estado = 'Programado';
                    this.contracts[index].costoServicio = this.costoDelServicio;
                }
                this.currentContract = null;
                this.showAcceptForm = false;
            });
        }
    }

    aceptarReserva(contract: Contract) {
    if (!contract.aceptado) {
      this.showAcceptModal(contract);
    } else {
      contract.estado = 'Programado';
      this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
    }
  }

  finalizarReserva(contract: Contract) {
    contract.estado = 'Finalizado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }

  rechazarReserva(contract: Contract) {
    contract.estado = 'Rechazado';
    this.api.updateContracts(contract.id, contract).subscribe(/* ... */);
  }



  filterAcceptedContracts(): void {
    this.acceptedContracts = this.contracts.filter(contract => contract.estado === 'Aceptado' || contract.estado === 'Finalizado');
  }

  filterRejectedContracts(): void {
    this.rejectedContracts = this.contracts.filter(contract => contract.estado === 'Rechazado' || contract.estado === 'Cancelado');
  }

  ngOnInit(): void {
    this.getAllClients().subscribe(() => {
      this.getAllContracts();
    });
    console.log('Estado "En proceso" se está filtrando correctamente:', this.contracts.filter(contract => contract.estado === 'En proceso'));
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
      console.log('Contratos actualizados:', this.contracts);
      this.filterAcceptedContracts();
      this.filterRejectedContracts();
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
