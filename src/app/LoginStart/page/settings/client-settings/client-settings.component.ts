import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-client-settings',
    templateUrl: './client-settings.component.html',
    styleUrls: ['./client-settings.component.css']
})

export class ClientSettingsComponent {
    userSettingsForm: FormGroup;
    errorMessage: string = '';
    id: any;
    client: any='';

    constructor(private fb: FormBuilder, private api: FastporteDataService, private route: ActivatedRoute, private router: Router) {
      this.userSettingsForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmarpassword: ['', Validators.required],
            fullname: ['', Validators.required],
            birthdate: ['', Validators.required],
            idNumber: ['', Validators.required],
            celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            country: ['', Validators.required],
            photo: ['', Validators.required],
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

        if (!formData.fullname) {
            warnings += 'El nuevo nombre no puede estar vacío.<br>';
        }

        if (!formData.birthdate) {
            warnings += 'El nuevo birthdate no puede estar vacío.<br>';
        }

        if (!formData.idNumber || !/^\d+$/.test(formData.idNumber)) {
            warnings += 'El nuevo Identify Card debe contener solo dígitos enteros.<br>';
        }

        if (!formData.celular || !/^\d+$/.test(formData.celular)) {
            warnings += 'El nuevo celular debe contener solo dígitos enteros.<br>';
        }

        if (!formData.country) {
            warnings += 'La nueva dirección no puede estar vacía.<br>';
        }

        if (!formData.photo) {
            warnings += 'La nueva foto no puede estar vacía.<br>';
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
            const newClientSettings={
                id: this.id,
                email: formData.email,
                password: formData.password,
                fullname: formData.fullname,
                birthdate: formData.birthdate,
                idNumber: formData.idNumber,
                celular: formData.celular,
                country: formData.country,
                photo: formData.photo,
                user_name: formData.user_name,
                user_description: formData.user_description
            }
            console.log('Nuevos ajustes validos: ', newClientSettings)

            this.api.updateClient(this.id, newClientSettings).subscribe(
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
  pageSettings() {
    const clientId = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/profile-client/${clientId}`);
  }

}
