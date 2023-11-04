import { Component, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatMenu } from '@angular/material/menu';
import {FastporteDataService} from "../../../../services/fastporte-data.service";

@Component({
  selector: 'app-toolbar-company',
  templateUrl: './toolbar-company.component.html',
  styleUrls: ['./toolbar-company.component.css']
})

export class ToolbarCompanyComponent {

  company: any = '';

  constructor(private companyDataService: FastporteDataService, private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
  }

  getCompany(id: any) {
    this.companyDataService.getCompanyById(id).subscribe(
      (res: any) =>
      {
        console.log("Company detail:", (res[id-1]));
        this.company = res[id-1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }

  pageHome(){
    const companyId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/home-company/${companyId}`);
  }
  pageProfile(){
    const companyId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/profile-company/${companyId}`);
  }

  pageSupport(){
    const companyId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/support-company/${companyId}`);
  }

  pageLogOut(){
    this.router.navigateByUrl('login');
  }
}
