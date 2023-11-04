import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})

export class CompanySettingsComponent {
  userSettingsForm: FormGroup;
  errorMessage: string = '';
  company: any='';
  id: any;
  constructor(private fb: FormBuilder, private api: FastporteDataService, private route: ActivatedRoute, private router: Router) {
    this.userSettingsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarpassword: ['', Validators.required],
      fullName: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      Celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      country: ['', Validators.required],
      photo: ['', Validators.required],
      job: ['', Validators.required],
      time_experience: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      license: ['', Validators.required],
      soat: ['', Validators.required],
      property_document: ['', Validators.required],
      certificate: ['', Validators.required],
      photovehicle: ['', Validators.required],
      photovehicle2: ['', Validators.required],
      user_name: ['', Validators.required],
      user_description: ['', [Validators.required]],
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
  }


  onSubmit(){
    this.errorMessage = '';
    const formData = this.userSettingsForm.value;
    let warnings = '';

    if (!formData.fullName) {
      warnings += 'El nuevo nombre no puede estar vacío.<br>';
    }

    if (!formData.birthdate) {
      warnings += 'El nuevo birthdate no puede estar vacío.<br>';
    }

    if (!formData.idNumber || !/^\d+$/.test(formData.idNumber)) {
      warnings += 'El nuevo Identify Card debe contener solo dígitos enteros.<br>';
    }

    if (!formData.Celular || !/^\d+$/.test(formData.Celular)) {
      warnings += 'El nuevo celular debe contener solo dígitos enteros.<br>';
    }

    if (!formData.age || !/^\d+$/.test(formData.age)) {
      warnings += 'La nueva edad debe contener solo dígitos enteros.<br>';
    }

    if (!formData.country) {
      warnings += 'La nueva dirección no puede estar vacía.<br>';
    }

    if (!formData.photo) {
      warnings += 'La nueva foto no puede estar vacía.<br>';
    }

    if (!formData.job) {
      warnings += 'El nuevo trabajo no puede estar vacío.<br>';
    }

    if (!formData.time_experience || !/^\d+$/.test(formData.time_experience)) {
      warnings += 'El tiempo de experiencia no puede estar vacía.<br>';
    }

    if (!formData.license) {
      warnings += 'El nuevo link de licencia no puede estar vacío.<br>';
    }

    if (!formData.soat) {
      warnings += 'El nuevo link de soat no puede estar vacío.<br>';
    }

    if (!formData.property_document) {
      warnings += 'El nuevo link de la propiedad del vehículo no puede estar vacío.<br>';
    }

    if (!formData.certificate) {
      warnings += 'El nuevo link del certificado no puede estar vacío.<br>';
    }

    if (!formData.photovehicle) {
      warnings += 'La nueva foto del vehículo no puede estar vacía.<br>';
    }

    if (!formData.photovehicle2) {
      warnings += 'La nueva foto del vehículo no puede estar vacía.<br>';
    }

    if (!formData.user_name) {
      warnings += 'El nuevo nombre de usuario no puede estar vacío<br>';
    }

    if (!formData.user_description) {
      warnings += 'La nueva descripción no puede estar vacío.<br>';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      warnings += 'La nueva dirección de email electronico no es válida.<br>';
    }

    if (formData.password.length < 6) {
      warnings += `La nueva contraseña no es valida <br>`;
    }

    if (formData.password !== formData.confirmarpassword) {
      warnings += 'La confirmación de la nueva contraseña no coincide.<br>';
    }

    this.errorMessage = warnings;

    if(this.errorMessage == ''){
      const newCompanySettings={
        id: this.id,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullname,
        Celular: formData.celular,
        birthdate: formData.birthdate,
        age: formData.age,
        idNumber: formData.idNumber,
        country: formData.country,
        photo: formData.photo,
        job: formData.job,
        time_experience: formData.time_experience,
        license:formData.license,
        soat: formData.soat,
        property_document: formData.property_document,
        certificate: formData.certificate,
        photovehicle: formData.photovehicle,
        photovehicle2: formData.photovehicle2,
        user_name: formData.user_name,
        user_description: formData.user_description
      }
      console.log('Nuevos ajustes validos: ', newCompanySettings)

      this.api.updateCompany(this.id, newCompanySettings).subscribe(
        (response) => {
          console.log('Respuesta del servidor: ', response);
          alert('Tus ajustes se han guardado exitosamente');
        },
        (error) => {
          console.log('Error al actualizar los ajustes: ', error);
          alert('Ha ocurrido un error al actualizar tus ajustes, por favor intenta de nuevo más tarde');
        }
      );

    }

  }

  pageSettings(){
    const companyId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/profile-company/${companyId}`);
  }

}
