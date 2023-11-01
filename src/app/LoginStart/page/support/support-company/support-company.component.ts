import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support-company.component.html',
  styleUrls: ['./support-company.component.css']
})
export class SupportCompanyComponent {
  redirectToWhatsApp() {
    window.location.href = ' https://w.app/flashporte';
  }
}
