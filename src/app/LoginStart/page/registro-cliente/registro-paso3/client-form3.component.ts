import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {RegistrationService} from "../../../../services/registration/registration.service";

@Component({
  selector: 'app-registro-paso3',
  templateUrl: './cliente-form3.component.html',
  styleUrls: ['./cliente-form3.component.css']
})
export class ClientForm3Component {
  clientRegistrationForm3: FormGroup;
  private userData: any = {};
  errorMessage: string = '';
  clientData: any = {};

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) { //private http: HttpClient
    this.clientRegistrationForm3 = this.fb.group({
      user_name: ['', Validators.required],
      user_description: ['', [Validators.required]],
      acceptPolicy: [false, [Validators.requiredTrue]],
      acceptInfo: [false, [Validators.requiredTrue]]
    });
  }
  onSubmit() {
    this.errorMessage = '';
    const formData = this.clientRegistrationForm3.value;
    let warnings = '';

    if (!formData.user_name || !formData.user_description) {
      warnings += 'All fields are required. <br>';
    }
    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      // Get the accumulated data from the service
      const clientData = this.registrationService.getUserData();
      clientData.user_name = formData.user_name;
      clientData.user_description = formData.user_description;

      this.api.createClient(clientData).subscribe((clientResponse: any) => {
        console.log(clientResponse);
        if (clientResponse && clientResponse.id) {
          this.router.navigate(['login']);
        }
      });
    }
  }
}
