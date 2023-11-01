import { Component } from "@angular/core";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegistrationService } from "../../../services/registration/registration.service";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {
  ContractsForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private api: FastporteDataService, private registrationService: RegistrationService) {
    this.ContractsForm = this.fb.group({
      from: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      to: ['', Validators.required],
      people: ['', Validators.required],
      weight: ['', Validators.required],
      time_range: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.ContractsForm.value;

    if (!formData.from || !formData.type || !formData.date || !formData.to || !formData.people || !formData.weight || !formData.time_range || !formData.description) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const contractData = {
      from: formData.from,
      type: formData.type,
      date: formData.date,
      to: formData.to,
      people: formData.people,
      weight: formData.weight,
      time_range: formData.time_range,
      description: formData.description
    };

    // Send the contractData to your JSON endpoint
    this.api.createContract(contractData)
      .subscribe(response => {
        // Handle the response here, e.g., show a success message
        console.log('Contract created:', response);
        // You can also redirect to a different page after a successful submission
        this.router.navigate(['/success']);
      }, error => {
        // Handle the error, e.g., display an error message
        console.error('Error creating contract:', error);
      });
  }
}
