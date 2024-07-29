import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllVehicles(): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicle(page:number): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehiclePaginate(page:number): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleSearch(page:number,information:any): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehiclePaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleById(id:number): Observable<any> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicle/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicle/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicle/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicle/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
