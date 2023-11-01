// registration.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  userData: any = {};

  setUserData(data: any) {
    this.userData = { ...this.userData, ...data };
  }

  getUserData() {
    return this.userData;
  }
}
