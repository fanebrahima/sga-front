import { Injectable } from '@angular/core';
import { Repair } from '../../models/repair.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private baseUrl = environment.api_url;

  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllRepairs(): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllRepairRemark(): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair/all-remark`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepair(page:number): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairPaginate(page:number): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairSearch(page:number,information:any): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getRepairById(id:number): Observable<any> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repair/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  replay(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/replay`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addBeforePhotos(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/add_before_photos`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addDuringPhotos(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/add_during_photos`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAfterPhotos(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/add_after_photos`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repair/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  downloadRepair(reference: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repair/download_repair/${reference}`, {headers: this.herdersService.header(),responseType: 'blob' as 'json'});
  }

  downloadPhoto(reference: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repair/download_photo/${reference}`, {headers: this.herdersService.header(),responseType: 'blob' as 'json'});
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
