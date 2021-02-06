import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(user : User) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/acl/login`, user, { withCredentials: true});
  }

  register(user : User) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/acl/register`, user, { withCredentials: true});
  }

  logout() : Observable<any> {
    // On passe par POST pour activer la validation CSRF de Express, sinon un GET aurait été suffisant
    return this.http.post(`${environment.apiUrl}/acl/logout`, null, { withCredentials: true});
  }
}
