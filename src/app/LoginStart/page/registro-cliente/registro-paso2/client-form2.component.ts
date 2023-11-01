import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { RegistrationService } from "../../../../services/registration/registration.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-paso2',
  templateUrl: './client-form2.component.html',
  styleUrls: ['./client-form2.component.css']
})
export class ClientForm2Component {
  clientRegistrationForm2: FormGroup;
  private userData: any = {};
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.clientRegistrationForm2 = this.fb.group({
      fullname: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      country: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      photo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.clientRegistrationForm2.value;
    let warnings = '';

    if (!formData.fullname || !formData.celular || !formData.birthdate || !formData.country || !formData.idNumber || !formData.photo) {
      warnings += 'Todos los campos son obligatorios. <br>';
    }

    if (!formData.celular || !/^\d+$/.test(formData.celular)) {
      warnings += 'El celular debe contener solo dígitos enteros.<br>';
    }

    if (!formData.idNumber || !/^\d+$/.test(formData.idNumber)) {
      warnings += 'El IdNumber debe contener solo dígitos enteros.<br>';
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      const clientData = {
        fullname: formData.fullname,
        celular: formData.celular,
        birthdate: formData.birthdate,
        idNumber: formData.idNumber,
        country: formData.country,
        photo: formData.photo,
      };
      this.registrationService.setUserData(clientData); // Set the data
      this.router.navigate(['registro/paso3']);
    }
  }
}
