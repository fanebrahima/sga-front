import { Injectable } from '@angular/core';
import { Designation } from '../../models/designation.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllDesignations(): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDesignation(page:number): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDesignationPaginate(page:number): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDesignationSearch(page:number,information:any): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDesignationPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDesignationById(id:number): Observable<any> {
    return this.http.get<Designation[]>(`${this.baseUrl}/designation/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Designation> {
    return this.http.post<Designation>(`${this.baseUrl}/designation/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<Designation> {
    return this.http.post<Designation>(`${this.baseUrl}/designation/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Designation> {
    return this.http.post<Designation>(`${this.baseUrl}/designation/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Designation> {
    return this.http.post<Designation>(`${this.baseUrl}/designation/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Designation> {
    return this.http.post<Designation>(`${this.baseUrl}/designation/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
