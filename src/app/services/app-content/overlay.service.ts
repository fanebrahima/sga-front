import { Injectable } from '@angular/core';
import { catchError, Observable,of } from 'rxjs';
import { Overlay } from '../../models/overlay.model';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private baseUrl = environment.api_url;
  
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getOverlays(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Overlay[]>(`${this.baseUrl}/overlay`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  getAllOverlays(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Overlay[]>(`${this.baseUrl}/overlay/getAll`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getOverlay(uuid: string): Observable<Overlay | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Overlay>(this.baseUrl + '/overlay/' + uuid,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<Overlay> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Overlay[]>(`${this.baseUrl}/overlay/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  add_report(data:any): Observable<Overlay> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Overlay[]>(`${this.baseUrl}/overlay/add_report`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<Overlay> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Overlay[]>(`${this.baseUrl}/overlay/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  enableCollege(data:any): Observable<Overlay> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Overlay[]>(`${this.baseUrl}/overlay/enableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  disableCollege(data:any): Observable<Overlay> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Overlay[]>(`${this.baseUrl}/overlay/disableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
