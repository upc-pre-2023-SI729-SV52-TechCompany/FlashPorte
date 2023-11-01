import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { RegistrationService } from "../../../../services/registration/registration.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-paso2',
  templateUrl: './company-form2.component.html',
  styleUrls: ['./company-form2.component.css']
})
export class CompanyForm2Component {
  companyRegistrationForm2: FormGroup;
  private userData: any = {};
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.companyRegistrationForm2 = this.fb.group({
      fullname: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      country: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      photo: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.companyRegistrationForm2.value;
    let warnings = '';

    if (!formData.fullname || !formData.celular || !formData.birthdate || !formData.country || !formData.idNumber || !formData.photo || !formData.age) {
      warnings += 'Todos los campos son obligatorios. <br>';
    }

    if (!formData.celular || !/^\d+$/.test(formData.celular)) {
      warnings += 'El celular debe contener solo dígitos enteros.<br>';
    }

    if (!formData.age || !/^\d+$/.test(formData.age)) {
      warnings += 'El celular debe contener solo dígitos enteros.<br>';
    }

    if (!formData.idNumber || !/^\d+$/.test(formData.idNumber)) {
      warnings += 'El IdNumber debe contener solo dígitos enteros.<br>';
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      const companyData = {
        fullname: formData.fullname,
        celular: formData.celular,
        birthdate: formData.birthdate,
        age: formData.age,
        idNumber: formData.idNumber,
        country: formData.country,
        photo: formData.photo,
      };
      this.registrationService.setUserData(companyData); // Set the data
      this.router.navigate(['registrocomp/paso3']);
    }
  }
}
