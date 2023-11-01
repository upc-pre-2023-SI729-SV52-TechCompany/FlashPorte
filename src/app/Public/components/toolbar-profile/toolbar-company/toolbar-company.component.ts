import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-company',
  templateUrl: './toolbar-company.component.html',
  styleUrls: ['./toolbar-company.component.css']
})

export class ToolbarCompanyComponent {

  userFullName = 'User Full Name';

  constructor(private router: Router) { }

  pageHome(){
    this.router.navigateByUrl('https://upc-pre-2023-si729-sv52-techcompany.github.io/LandingPage-V1/#about');
  }
  pageProfile(){
    this.router.navigateByUrl('/profile-company/:id');
  }

  pageSupport(){
    this.router.navigateByUrl('/supportcompany');
  }

  pageLogOut(){
    this.router.navigateByUrl('login');
  }
}
