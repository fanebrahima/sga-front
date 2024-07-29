import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  

  headerName = 'X-XSRF-TOKEN';

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method === 'GET' || req.method === 'HEAD') {
      return next.handle(req);
    }

    const token = this.tokenService.get();

    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({headers: req.headers.set(this.headerName, token)});
    }
    return next.handle(req);
  }
}
