import { Injectable } from '@angular/core';
import { RepairWork } from '../../models/repair-work.model';
import { catchError, Observable,of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairWorkService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getRepairWorks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<RepairWork[]>(`${this.baseUrl}/repair-work`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getRepairWork(id: number): Observable<RepairWork | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<RepairWork>(this.baseUrl + '/repair-work/' + id,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<RepairWork> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<RepairWork[]>(`${this.baseUrl}/repair-work/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<RepairWork> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<RepairWork[]>(`${this.baseUrl}/repair-work/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
