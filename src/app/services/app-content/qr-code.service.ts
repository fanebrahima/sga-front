import { Injectable } from '@angular/core';
import { QrCode } from '../../models/qr-code.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllQrCodes(): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOneQrCodes(): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code/one`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getQrCode(page:number): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getQrCodePaginate(page:number): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getQrCodeSearch(page:number,information:any): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getQrCodePaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getQrCodeById(id:number): Observable<any> {
    return this.http.get<QrCode[]>(`${this.baseUrl}/qr-code/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}/qr-code/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addAll(data:any): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}/qr-code/create-all`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}/qr-code/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}/qr-code/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disable(data:any): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}/qr-code/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
