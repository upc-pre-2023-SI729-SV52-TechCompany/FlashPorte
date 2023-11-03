import {Component} from '@angular/core';
@Component({
  selector: 'app-vehicle-reservation',
  templateUrl: './vehicle-reservation.component.html',
  styleUrls: ['./vehicle-reservation.component.css']
})



export class VehicleReservationComponent {
  public mostrarFormulario: boolean = false;

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

}
