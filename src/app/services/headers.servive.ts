import { Injectable } from '@angular/core';
import { catchError, Observable,of, throwError } from 'rxjs';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from '../models/user.model';
import jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  token!: any;
  decode_token!: any;

  private api_url = environment.api_url;

  
  constructor(private http: HttpClient) { }

  header(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // 'Content-Type': 'application/json',
      });
  }
  
}
