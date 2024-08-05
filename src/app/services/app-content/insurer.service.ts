import { Injectable } from '@angular/core';
import { Insurer } from '../../models/insurer.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {

  private baseUrl = environment.api_url;

  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllInsurers(): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getInsurer(page:number): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getInsurerPaginate(page:number): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getInsurerSearch(page:number,information:any): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getInsurerPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getInsurerById(id:number): Observable<any> {
    return this.http.get<Insurer[]>(`${this.baseUrl}/insurer/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Insurer> {
    return this.http.post<Insurer>(`${this.baseUrl}/insurer/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Insurer> {
    return this.http.post<Insurer>(`${this.baseUrl}/insurer/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Insurer> {
    return this.http.post<Insurer>(`${this.baseUrl}/insurer/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Insurer> {
    return this.http.post<Insurer>(`${this.baseUrl}/insurer/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
