import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { catchError, Observable,of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.api_url;
  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  getProfiles(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    
    return this.http.get<Profile[]>(`${this.baseUrl}/profile`,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  getProfile(id: number): Observable<Profile | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Profile>(this.baseUrl + '/profile/' + id,{headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur'))
    );
  }

  create(data:any): Observable<Profile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Profile[]>(`${this.baseUrl}/profile/create`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }

  update(data:any): Observable<Profile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Profile[]>(`${this.baseUrl}/profile/update`, data, {headers: headers}).pipe(catchError(this.errorHandler<any>('Erreur')));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
