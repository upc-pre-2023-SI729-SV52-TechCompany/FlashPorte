import { Component } from '@angular/core';
import {FastporteDataService} from "../../../services/fastporte-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-vehicle-reservation',
    templateUrl: './vehicle-reservation.component.html',
    styleUrls: ['./vehicle-reservation.component.css']
})
export class VehicleReservationComponent  {
  company: any = '';
    mostrarElement: boolean = false;
    nombreUsuario: string = '';
    calificacion: number = 0;
    resenia: string = '';
    mostrarFormulario: boolean = false;

  constructor(private companyDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
  }

  getCompany(id: any) {
    this.companyDataService.getCompanyById(id).subscribe(
      (res: any) =>
      {
        console.log("Company detail:", (res[id-1]));
        this.company = res[id-1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }

    toggleElement() {
        this.mostrarElement = !this.mostrarElement;
    }

    setRating(rating: number) {
        this.calificacion = rating;
    }

    enviarResenia() {
        console.log('Nombre de usuario:', this.nombreUsuario);
        console.log('Calificación:', this.calificacion);
        console.log('Reseña:', this.resenia);
    }

    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }

    realizarReserva() {
        // Agrega aquí la lógica para manejar la reserva
    }
}
