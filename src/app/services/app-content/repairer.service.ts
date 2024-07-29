import { Injectable } from '@angular/core';
import { Repairer } from '../../models/repairer.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class RepairerService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllRepairers(): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairer(page:number): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairerPaginate(page:number): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairerSearch(page:number,information:any): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairerPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairerById(id:number): Observable<any> {
    return this.http.get<Repairer[]>(`${this.baseUrl}/repairer/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Repairer> {
    return this.http.post<Repairer>(`${this.baseUrl}/repairer/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Repairer> {
    return this.http.post<Repairer>(`${this.baseUrl}/repairer/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Repairer> {
    return this.http.post<Repairer>(`${this.baseUrl}/repairer/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Repairer> {
    return this.http.post<Repairer>(`${this.baseUrl}/repairer/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
