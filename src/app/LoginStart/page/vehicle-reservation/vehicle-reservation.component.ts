import { Component } from '@angular/core';

@Component({
    selector: 'app-vehicle-reservation',
    templateUrl: './vehicle-reservation.component.html',
    styleUrls: ['./vehicle-reservation.component.css']
})
export class VehicleReservationComponent {
    mostrarElement: boolean = false;
    nombreUsuario: string = '';
    calificacion: number = 0;
    resenia: string = '';
    mostrarFormulario: boolean = false;

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
