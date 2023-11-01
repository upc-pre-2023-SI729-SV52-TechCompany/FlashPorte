import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { RegistrationService } from "../../../../services/registration/registration.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-paso3',
  templateUrl: './company-form3.component.html',
  styleUrls: ['./company-form3.component.css']
})
export class CompanyForm3Component {
  companyRegistrationForm3: FormGroup;
  private userData: any = {};
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.companyRegistrationForm3 = this.fb.group({
      job: ['', Validators.required],
      time_experience: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.companyRegistrationForm3.value;
    let warnings = '';

    if (!formData.job || !formData.time_experience) {
      warnings += 'Todos los campos son obligatorios. <br>';
    }


    this.errorMessage = warnings;

    if (this.errorMessage === '') {
      // Crear el objeto de datos de la empresa
      const companyData = {
        job: formData.job,
        time_experience: formData.time_experience,
      };

      this.registrationService.setUserData(companyData);
      this.router.navigate(['registrocomp/paso4']);
    }
  }
}
