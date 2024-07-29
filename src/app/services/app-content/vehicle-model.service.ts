import { Injectable } from '@angular/core';
import { VehicleModel } from '../../models/vehicle-model.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllVehicleModels(): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleModel(page:number): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleModelPaginate(page:number): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleModelSearch(page:number,information:any): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleModelPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getVehicleModelById(id:number): Observable<any> {
    return this.http.get<VehicleModel[]>(`${this.baseUrl}/vehicle-model/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.baseUrl}/vehicle-model/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.baseUrl}/vehicle-model/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.baseUrl}/vehicle-model/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.baseUrl}/vehicle-model/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.baseUrl}/vehicle-model/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
