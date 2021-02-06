import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AclService {

  constructor(private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    // Le cookie est détruit automatiquement lorsque son expires est dépassé, ça nous fait un logout automatique
    return this.cookieService.check('SESSIONINFO');
  }
}
