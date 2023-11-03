import { Component, Input } from '@angular/core';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent {
  company: any = '';
  @Input() serviceName: string = '';
  @Input() serviceType: string = '';
  @Input() vehicleType: string = '';
  @Input() serviceUrl: string = '';

  constructor(private companyDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
  }

  servicesToShow = [
    {
      serviceName: 'Servicio 1',
      serviceType: 'Tipo 1',
      vehicleType: 'Vehículo 1',
      serviceUrl: '/ruta-detalle-1'
    },
    {
      serviceName: 'Servicio 2',
      serviceType: 'Tipo 2',
      vehicleType: 'Vehículo 2',
      serviceUrl: '/ruta-detalle-2'
    },
    {
      serviceName: 'Servicio 3',
      serviceType: 'Tipo 3',
      vehicleType: 'Vehículo 3',
      serviceUrl: '/ruta-detalle-3'
    },
  ];

  historyToShow = [
    {
      name: 'Historia 1',
      fromAddress: 'Dirección 1',
      toAddress: 'Dirección 2'
    },
    {
      name: 'Historia 2',
      fromAddress: 'Dirección 1',
      toAddress: 'Dirección 2'
    },
    {
      name: 'Historia 3',
      fromAddress: 'Dirección 1',
      toAddress: 'Dirección 2'
    },
  ];

  ngOnInit(): void {
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
