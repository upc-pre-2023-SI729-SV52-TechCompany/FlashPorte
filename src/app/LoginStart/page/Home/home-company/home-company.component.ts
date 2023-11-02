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
