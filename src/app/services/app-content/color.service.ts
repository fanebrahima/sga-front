import { Injectable } from '@angular/core';
import { Color } from '../../models/color.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllColors(): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getColor(page:number): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getColorPaginate(page:number): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getColorSearch(page:number,information:any): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getColorPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getColorById(id:number): Observable<any> {
    return this.http.get<Color[]>(`${this.baseUrl}/color/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/color/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/color/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/color/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/color/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/color/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
