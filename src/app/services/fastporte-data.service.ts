import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Client } from "../LoginStart/models/client.model";
import { Company } from "../LoginStart/models/company.model";
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
//import { BookingHistory } from '../models/booking-history.model';
//import { Chat } from '../models/chat.model';

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

  //createReservation(item: any): Observable<BookingHistory>{
    //return this.http.post<BookingHistory>(this.base_url+"/"+"bookingHistory", JSON.stringify(item), this.httpOptions).pipe(retry(2),catchError(this.handleError));
  //}

  // Get all booking history
  //getAllBookingHistory(): Observable<BookingHistory> {
    //return this.http.get<BookingHistory>(`${this.base_url}/bookingHistory`)
      //.pipe(retry(2),catchError(this.handleError))
  //}

  // Get all messages
  //getItems(): Observable<Chat> {
    //return this.http.get<Chat>(`${this.base_url}/chat`)
      //.pipe(retry(2),catchError(this.handleError))
  //}

  //createMessage
  //createItem(item:any): Observable<Chat>{
    //return this.http.post<Chat>(`${this.base_url}/chat`, JSON.stringify(item), this.httpOptions)
    //.pipe(retry(2),catchError(this.handleError))
  //}

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
}
