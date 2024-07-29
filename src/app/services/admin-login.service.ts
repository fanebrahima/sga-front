import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from './access.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.Access.admin();
  }

  constructor(private Access: AccessService) { }
  
}

