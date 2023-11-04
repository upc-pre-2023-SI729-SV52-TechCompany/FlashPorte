// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    selectedCompanyId: number;

    constructor() {
        this.selectedCompanyId = 0; // Inicializa con un valor por defecto, o el valor que prefieras
    }
}
