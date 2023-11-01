import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {RegistrationService} from "../../../../services/registration/registration.service";

@Component({
  selector: 'app-registro-paso5',
  templateUrl: './company-form5.component.html',
  styleUrls: ['./company-form5.component.css']
})
export class CompanyForm5Component {
  companyRegistrationForm3: FormGroup;
  private userData: any = {};
  errorMessage: string = '';
  companyData: any = {};

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.companyRegistrationForm3 = this.fb.group({
      user_name: ['', Validators.required],
      user_description: ['', [Validators.required]],
      acceptPolicy: [false, [Validators.requiredTrue]],
      acceptInfo: [false, [Validators.requiredTrue]]
    });
  }
  onSubmit() {
    this.errorMessage = '';
    const formData = this.companyRegistrationForm3.value;
    let warnings = '';

    if (!formData.user_name || !formData.user_description) {
      warnings += 'All fields are required. <br>';
    }
    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      // Get the accumulated data from the service
      const companyData = this.registrationService.getUserData();
      companyData.user_name = formData.user_name;
      companyData.user_description = formData.user_description;

      this.api.createCompany(companyData).subscribe((companyResponse: any) => {
        console.log(companyResponse);
        if (companyResponse && companyResponse.id) {
          this.router.navigate(['login']);
        }
      });
    }
  }
}
