import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AclService} from "../services/acl.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private aclService: AclService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.aclService.isLoggedIn()) {
      return true;
    }
    else {
      // return false <- le lien ne fonctionne plus
      // la ligne suivante redirige:
      return this.router.parseUrl('/login');
    }
  }
  
}
