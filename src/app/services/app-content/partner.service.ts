import { Injectable } from '@angular/core';
import { Partner } from '../../models/partner.model';
import { catchError, Observable,of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getPartners(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Partner[]>(`${this.baseUrl}/partner`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getPartner(id: number): Observable<Partner | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Partner>(this.baseUrl + '/partner/' + id,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<Partner> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Partner[]>(`${this.baseUrl}/partner/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<Partner> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Partner[]>(`${this.baseUrl}/partner/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
