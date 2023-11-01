import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support-client.component.html',
  styleUrls: ['./support-client.component.css']
})
export class SupportClientComponent {
  redirectToWhatsApp() {
    window.location.href = ' https://w.app/flashporte';
  }
}
