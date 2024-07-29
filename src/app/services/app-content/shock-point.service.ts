import { Injectable } from '@angular/core';
import { ShockPoint } from '../../models/shock-point.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class ShockPointService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllShockPoints(): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getShockPoint(page:number): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getShockPointPaginate(page:number): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getShockPointSearch(page:number,information:any): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getShockPointPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getShockPointById(id:number): Observable<any> {
    return this.http.get<ShockPoint[]>(`${this.baseUrl}/shock-point/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<ShockPoint> {
    return this.http.post<ShockPoint>(`${this.baseUrl}/shock-point/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<ShockPoint> {
    return this.http.post<ShockPoint>(`${this.baseUrl}/shock-point/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<ShockPoint> {
    return this.http.post<ShockPoint>(`${this.baseUrl}/shock-point/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<ShockPoint> {
    return this.http.post<ShockPoint>(`${this.baseUrl}/shock-point/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<ShockPoint> {
    return this.http.post<ShockPoint>(`${this.baseUrl}/shock-point/disable`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
