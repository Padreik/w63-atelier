import { Component, OnInit } from '@angular/core';
import {AclService} from "../services/acl.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
      public aclService: AclService,
      private authService: AuthenticationService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
