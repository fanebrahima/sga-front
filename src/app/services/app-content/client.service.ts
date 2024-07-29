import { Injectable } from '@angular/core';
import { Client } from '../../models/client.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.api_url;

  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllClients(): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClient(page:number): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientPaginate(page:number): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientSearch(page:number,information:any): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientById(id:number): Observable<any> {
    return this.http.get<Client[]>(`${this.baseUrl}/client/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/client/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/client/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/client/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/client/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
