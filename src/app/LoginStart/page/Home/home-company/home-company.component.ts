import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent {
  @Input() serviceName: string = '';
  @Input() serviceType: string = '';
  @Input() vehicleType: string = '';
  @Input() serviceUrl: string = '';
}
