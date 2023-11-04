import { Component, OnInit } from "@angular/core";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  clientContracts: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private api: FastporteDataService) {}

  ngOnInit() {
    const clientId = this.activatedRoute.snapshot.params['id'];

    // Realiza una solicitud HTTP para obtener todos los contratos
    this.api.getAllContracts().subscribe((contracts: any[]) => {
      // Filtra los contratos para el cliente específico
      this.clientContracts = contracts.filter(contract => contract.clientId === clientId);
    });
  }
}
