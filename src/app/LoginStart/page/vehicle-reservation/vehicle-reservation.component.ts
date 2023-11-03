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
    reseña: string = '';
    mostrarFormulario: boolean = false;

    toggleElement(elementId: string) {
        this.mostrarElement = !this.mostrarElement;
    }

    setRating(rating: number) {
        this.calificacion = rating;
    }

    enviarReseña() {
        console.log('Nombre de usuario:', this.nombreUsuario);
        console.log('Calificación:', this.calificacion);
        console.log('Reseña:', this.reseña);
    }

    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }
}
