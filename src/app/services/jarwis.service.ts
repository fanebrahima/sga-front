import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = environment.api_url;

  
  constructor(private http: HttpClient,
              private Token: TokenService) { }

  signup(data:any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  login(data:any) {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // });
    return this.http.post(`${this.baseUrl}/login`, data)
  }

}
