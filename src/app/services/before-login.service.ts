import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { TokenService } from './token.service';
import { JarwisService } from './jarwis.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if(this.Token.loggedIn()){
      this.router.navigateByUrl('/').then();
      return !this.Token.loggedIn();
    } else {
      return !this.Token.loggedIn();
    }

  }
  
  constructor(private jarwis: JarwisService, private Token: TokenService, private router: Router) { }
}
