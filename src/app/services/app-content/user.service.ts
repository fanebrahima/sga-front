import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.api_url;

  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user/list/all`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUser(page:number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user/list?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginate(page:number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserSearch(page:number,information:any): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user/search/`+ information + `?page=${page}`, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserById(id:number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/user/`+id, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  add(data:any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/create`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addByRepairer(data:any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/create_by_repairer`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  update(data:any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/update`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateByRepairer(data:any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/update_by_repairer`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enable(data:any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/enable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableUser(data:string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/disable`, data, {headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserProfile(): Observable<User | undefined> {
    return this.http.get<User>(this.baseUrl + '/user', {headers: this.herdersService.header()}).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  reset(data:any): Observable<User | undefined> {
    return this.http.post<User>(this.baseUrl + '/user/reset', data, {headers: this.herdersService.header()}).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  resetPassword(data:any): Observable<User | undefined> {
    return this.http.post<User>(this.baseUrl + '/user/reset_password', data, {headers: this.herdersService.header()}).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  resetUserPassword(data:any): Observable<User | undefined> {
    return this.http.post<User>(this.baseUrl + '/user/reset_user_password', data, {headers: this.herdersService.header()}).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
