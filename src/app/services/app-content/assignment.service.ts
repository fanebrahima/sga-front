import { Injectable } from '@angular/core';
import { catchError, Observable,of } from 'rxjs';
import { Assignment } from '../../models/assignment.model';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private baseUrl = environment.api_url;
  
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getAssignments(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Assignment[]>(`${this.baseUrl}/assignment`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  getAllAssignments(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Assignment[]>(`${this.baseUrl}/assignment/getAll`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getAssignment(uuid: string): Observable<Assignment | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Assignment>(this.baseUrl + '/assignment/' + uuid,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<Assignment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Assignment[]>(`${this.baseUrl}/assignment/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  add_report(data:any): Observable<Assignment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Assignment[]>(`${this.baseUrl}/assignment/add_report`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<Assignment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Assignment[]>(`${this.baseUrl}/assignment/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  enableCollege(data:any): Observable<Assignment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Assignment[]>(`${this.baseUrl}/assignment/enableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  disableCollege(data:any): Observable<Assignment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Assignment[]>(`${this.baseUrl}/assignment/disableCollege`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
