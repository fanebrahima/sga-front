import { Injectable } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllBrands(): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getBrand(page:number): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getBrandPaginate(page:number): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getBrandSearch(page:number,information:any): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getBrandPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getBrandById(id:number): Observable<any> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brand/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/brand/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/brand/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/brand/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/brand/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/brand/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
