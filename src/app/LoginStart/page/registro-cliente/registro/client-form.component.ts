import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { RegistrationService } from "../../../../services/registration/registration.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-registro',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  private userData: any = {};
  clientRegistrationForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.clientRegistrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{12,}$/)]],
      confirmarpassword: ['', Validators.required],
    });
  }
  onSubmit() {
    this.errorMessage = '';
    const formData = this.clientRegistrationForm.value;
    let warnings = '';

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      warnings += 'El email electrónico no es válido.<br>';
    }

    if (!formData.password || formData.password.length < 6) {
      warnings += 'La contraseña debe tener al menos una letra en mayúscula, 12 caracteres y al menos 2 números.<br>';
    }

    if (formData.password !== formData.confirmarpassword) {
      warnings += 'Las contraseñas no coinciden.<br>';
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      const clientData = {
        email: formData.email,
        password: formData.password
      };
      this.registrationService.setUserData(clientData); // Set the data
      this.router.navigate(['registro/paso2']);
    }
  }
}
