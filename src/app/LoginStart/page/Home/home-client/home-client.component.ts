import { Component } from '@angular/core';
import { Company } from "../../../models/company.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {
  client: any = '';
  companyData!: Company;
  companies: any[] = [];
  popularDrivers: any[] = [];

  constructor(private companyDataService: FastporteDataService, private clientDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getClient(params['id']);
      }
    );
    this.companyData = {} as Company;
  }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyDataService.getAllCompanies().subscribe((res: any) => {
      this.companies = res;
      this.getPopularDrivers();
    });
  }

  getClient(id: any) {
    this.clientDataService.getClientById(id).subscribe(
      (res: any) => {
        console.log("Client detail:", (res[id - 1]));
        this.client = res[id - 1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }

  getPopularDrivers() {
    this.popularDrivers = this.getRandomElements(this.companies, 2);
  }

  getRandomElements(arr: any[], numElements: number): any[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }
}
