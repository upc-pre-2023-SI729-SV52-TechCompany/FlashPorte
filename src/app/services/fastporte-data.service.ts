import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Client } from "../LoginStart/models/client.model";
import { Company } from "../LoginStart/models/company.model";
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FastporteDataService {
  base_url = environment.baseURL;

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`Ocurrió un error: ${error.status}, el cuerpo fue: ${error.error}`);
    }
    else {
      console.log(`El servidor respondió con el código ${error.status}, el cuerpo fue: ${error.error}`);
    }
    return throwError('Ha ocurrido un problema con la solicitud, por favor inténtalo de nuevo más tarde');
  }

  getAllCompanies(): Observable<Company> {
    return this.http.get<Company>(this.base_url+"/"+"companies").pipe(retry(2),catchError(this.handleError));
  }

  getAllClients(): Observable<Client> {
    return this.http.get<Client>(this.base_url+"/"+"clients").pipe(retry(2),catchError(this.handleError));
  }

  //for registration
  createClient(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/clients`, JSON.stringify(data), this.httpOptions);
  }

  //for login
  getClientsForLogin(email: string, password: string): Observable<any> {
    return this.http.get(`${this.base_url}/clients?email=${email}&password=${password}`);
  }
  getClientById(id: any): Observable<Client> {
   return this.http.get<Client>(this.base_url+"/"+"clients").pipe(retry(2),catchError(this.handleError));
  }

  createCompany(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/companies`, JSON.stringify(data), this.httpOptions);
  }

  getCompaniesForLogin(email: string, password: string): Observable<any> {
    return this.http.get(`${this.base_url}/companies?email=${email}&password=${password}`);
  }

  getCompanyById(id: any): Observable<Company> {
  return this.http.get<Company>(this.base_url+"/"+"companies").pipe(retry(2),catchError(this.handleError));
  }

  //for settings
  updateClient(id: any, data: any): Observable<any> {
    return this.http.put(`${this.base_url}/clients/${id}`, JSON.stringify(data), this.httpOptions);
  }

  updateCompany(id: any, data: any): Observable<any> {
    return this.http.put(`${this.base_url}/companies/${id}`, JSON.stringify(data), this.httpOptions);
  }

  createContract(contractData: any): Observable<any> {
    return this.http.post(`${this.base_url}/contracts`, JSON.stringify(contractData), this.httpOptions);
  }

  getAllContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base_url}/contracts`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
