import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
    loginForm: FormGroup;
    emailVerify: string = '';
    passwordVerify: string = '';
    errorMessage: string = '';

  constructor(private fb: FormBuilder, private api: FastporteDataService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const LoginData = this.loginForm.value;
    let warnings = "";

    if(!LoginData.email || !LoginData.password){
      warnings += `Se necesitan ambos campos para acceder <br>`;
    }

    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(LoginData.email)){
      warnings += `Email incorrecto<br>`;
    }

    if(LoginData.password.length < 6){
      warnings += `Contraseña incorrecta<br>`;
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      this.emailVerify = this.loginForm.value.email;
      this.passwordVerify = this.loginForm.value.password;

      try {
        this.api.getClientsForLogin(this.emailVerify, this.passwordVerify)
          .subscribe((clientResponse: any) => {
            console.log("Client Response", clientResponse)
            if (clientResponse && clientResponse.length > 0) {
              this.router.navigate(['home-client', clientResponse[0].id]);
            }
            else {
              this.api.getCompaniesForLogin(this.emailVerify, this.passwordVerify)
                .subscribe((companyResponse: any) => {
                  console.log("Company Response", companyResponse)
                  if (companyResponse && companyResponse.length > 0) {
                    this.router.navigate(['home-company', companyResponse[0].id]);
                  } else {
                    this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
                  }
                }, (error: any) => {
                  console.error(error);
                  this.errorMessage = 'Ocurrió un error al iniciar sesión. Intente nuevamente.';
                });
            }
          }, (error: any) => {
            console.error(error);
            this.errorMessage = 'Ocurrió un error al iniciar sesión. Intente nuevamente.';
          });
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Ocurrió un error al iniciar sesión. Intente nuevamente.';
      }
    }
  }
}
