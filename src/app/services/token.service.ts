import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  constructor() { }
  

  handle(token:any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token:any) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return true;
      }
    }
    return false;
  }

  payload(token:any) {
    return token;
  }

  loggedIn() {
    return this.isValid();
  }
}
