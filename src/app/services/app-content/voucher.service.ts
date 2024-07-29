import { Injectable } from '@angular/core';
import { catchError, Observable,of } from 'rxjs';
import { Voucher } from '../../models/voucher.model';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private baseUrl = environment.api_url;
  
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getVouchers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Voucher[]>(`${this.baseUrl}/voucher`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  getAllVouchers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Voucher[]>(`${this.baseUrl}/voucher/getAll`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getVoucher(uuid: string): Observable<Voucher | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Voucher>(this.baseUrl + '/voucher/' + uuid,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<Voucher> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Voucher[]>(`${this.baseUrl}/voucher/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  add_report(data:any): Observable<Voucher> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Voucher[]>(`${this.baseUrl}/voucher/add_report`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<Voucher> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Voucher[]>(`${this.baseUrl}/voucher/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  enableCollege(data:any): Observable<Voucher> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Voucher[]>(`${this.baseUrl}/voucher/enableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  disableCollege(data:any): Observable<Voucher> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Voucher[]>(`${this.baseUrl}/voucher/disableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
