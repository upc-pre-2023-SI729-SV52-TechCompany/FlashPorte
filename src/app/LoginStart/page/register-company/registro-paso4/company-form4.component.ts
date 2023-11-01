import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { RegistrationService } from "../../../../services/registration/registration.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-paso4',
  templateUrl: './company-form4.component.html',
  styleUrls: ['./company-form4.component.css']
})
export class CompanyForm4Component {
  companyRegistrationForm4: FormGroup;
  private userData: any = {};
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.companyRegistrationForm4 = this.fb.group({
      license: ['', Validators.required],
      soat: ['', Validators.required],
      property_document: ['', Validators.required],
      certificate: ['', Validators.required],
      photovehicle: ['', Validators.required],
      photovehicle2: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.companyRegistrationForm4.value;
    let warnings = '';

    if (!formData.license || !formData.soat || !formData.property_document || !formData.certificate || !formData.photovehicle || !formData.photovehicle2) {
      warnings += 'Todos los campos son obligatorios. <br>';
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      const companyData = {
        license: formData.license,
        soat: formData.soat,
        property_document: formData.property_document,
        certificate: formData.certificate,
        photovehicle: formData.photovehicle,
        photovehicle2: formData.photovehicle2,
      };
      this.registrationService.setUserData(companyData); // Set the data
      this.router.navigate(['registrocomp/paso5']);
    }
  }
}
