import { Component, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-company',
  templateUrl: './toolbar-company.component.html',
  styleUrls: ['./toolbar-company.component.css']
})

export class ToolbarCompanyComponent {

  userFullName = 'User Full Name';

  constructor(private router: Router, private route: ActivatedRoute) { }

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
