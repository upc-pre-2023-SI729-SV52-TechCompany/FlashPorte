import { Component, OnInit } from "@angular/core";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts-client.component.html',
  styleUrls: ['./contracts-client.component.css']
})
export class ContractsClientComponent implements OnInit {
  clientContracts: any[] = [];
  rejectedPermanentContracts: any[] = []; // Agrega esta lista

  constructor(private activatedRoute: ActivatedRoute, private api: FastporteDataService) {}

  ngOnInit() {
    const clientId = this.activatedRoute.snapshot.params['id'];

    // Realiza una solicitud HTTP para obtener todos los contratos
    this.api.getAllContracts().subscribe((contracts: any[]) => {
      // Filtra los contratos para el cliente específico
      this.clientContracts = contracts.filter(contract => contract.clientId === clientId);

      this.rejectedPermanentContracts = contracts.filter(contract => contract.clientId === clientId && contract.rejectedPermanent);
    });
  }
}
