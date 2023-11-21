import { Component } from '@angular/core';
import {FastporteDataService} from "../../../services/fastporte-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SharedService } from "../../../services/contracts/shared.service";

@Component({
    selector: 'app-vehicle-reservation',
    templateUrl: './vehicle-reservation.component.html',
    styleUrls: ['./vehicle-reservation.component.css']
})
export class VehicleReservationComponent {
  company: any = '';
  client: any = '';
  mostrarElement: boolean = false;
  nombreUsuario: string = '';
  calificacion: number = 0;
  resenia: string = '';
  mostrarFormulario: boolean = false;
  ContractsForm: FormGroup;
  ReviewsForm: FormGroup;
  errorMessage: string = '';

  constructor(private sharedService: SharedService, private fb: FormBuilder, private companyDataService: FastporteDataService, private route: ActivatedRoute, private activatedRoute: ActivatedRoute, private router: Router, private api: FastporteDataService) {
    this.ContractsForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: ['', Validators.required],
      fechaHoy: ['', Validators.required],
      servicios: ['', Validators.required],
      direccionEntrega: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      fechaServicio: ['', Validators.required],
      horaServicio: ['', Validators.required],
      numeroTarjeta: ['', Validators.required],
      cvvTarjeta: ['', Validators.required],
      vencimientoTarjeta: ['', Validators.required]
    });
    this.ReviewsForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      calificacion: ['', Validators.required],
      resenia: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(
      params => {
        this.getCompany(params['id']);
      }
    );
  }

  getCompanyDetails() {
    const companyId = this.sharedService.selectedCompanyId; // Obtiene el ID del trabajador
    this.getCompany(companyId);
  }

  getCompany(id: any) {
    this.companyDataService.getCompanyById(id).subscribe(
      (res: any) => {
        console.log("Company detail:", (res[id - 1]));
        this.company = res[id - 1];
      },
      err => {
        console.log("Error:", err);
      }
    );
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.ContractsForm.value;
    const clientId = this.route.snapshot.params['id'];
    const companyId = this.sharedService.selectedCompanyId;

    if (!formData.nombre || !formData.foto  ||!formData.fechaHoy || !formData.servicios || !formData.direccionEntrega || !formData.direccionDestino || !formData.fechaServicio || !formData.horaServicio || !formData.numeroTarjeta || !formData.cvvTarjeta || !formData.vencimientoTarjeta) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    const contractData = {
      clientId: clientId,
      companyId: companyId,
      nombre: formData.nombre,
      foto: formData.foto,
      estado: 'En proceso',
      fechaHoy: formData.fechaHoy,
      servicios: formData.servicios,
      direccionEntrega: formData.direccionEntrega,
      direccionDestino: formData.direccionDestino,
      fechaServicio: formData.fechaServicio,
      horaServicio: formData.horaServicio,
      numeroTarjeta: formData.numeroTarjeta,
      cvvTarjeta: formData.cvvTarjeta,
      vencimientoTarjeta: formData.vencimientoTarjeta
    };

    this.api.createContract(contractData)
      .subscribe(response => {
        console.log('Contract created:', response);
        const clientId = this.route.snapshot.params['id'];
        console.log('Client ID:', clientId);
        this.router.navigateByUrl(`/contracts-client/${clientId}`);
      }, error => {
        console.error('Error creating contract:', error);
      });
  }

  onReviewSubmit(){
    const formData = this.ReviewsForm.value;
    const clientId = this.route.snapshot.params['id'];
    const companyId = this.sharedService.selectedCompanyId;

    if (!formData.nombreUsuario || !formData.calificacion || !formData.resenia) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const reviewData={
      clientId: clientId,
      companyId: companyId,
      nombreUsuario: formData.nombreUsuario,
      calificacion: formData.calificacion,
      resenia:formData.resenia
    }

    this.api.createReview(reviewData)
        .subscribe(response => {
          console.log('Review created:', response);
          const clientId = this.route.snapshot.params['id'];
          console.log('Client ID:', clientId);
          this.router.navigateByUrl(`/search-vehicle/${clientId}`);
        }, error => {
          console.error('Error creating review:', error);
        });
  }

    toggleElement()
    {
      this.mostrarElement = !this.mostrarElement;
    }

    setRating(rating:number)
    {
      this.calificacion = rating;
    }

    toggleFormulario()
    {
      this.mostrarFormulario = !this.mostrarFormulario;
    }
}
