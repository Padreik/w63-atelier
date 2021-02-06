import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error : string = "";
  private errorMessages : any = {
    username : {
      required : "Le nom d'utilisateur ne peut pas être vide"
    },
    password : {
      required : "Le mot de passe ne peut pas être vide"
    }
  };

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.getFirstErrorMessage();
    }
    else {
      let user : User = this.loginForm.getRawValue();
      this.authenticationService.login(user).subscribe(response => {
        this.router.navigateByUrl('/');
      }, error => {
        this.error = typeof error == 'object' ? error.message : error.error;
      });
    }
  }

  registerClick(): void {
    if (this.loginForm.invalid) {
      this.getFirstErrorMessage();
    }
    else {
      this.error = "";
      let user : User = this.loginForm.getRawValue();
      this.authenticationService.register(user).subscribe(response => {
        this.router.navigateByUrl('/');
      }, error => {
        this.error = error.error;
      });
    }
  }

  // Méthode utile seulement si vous voulez afficher un seul message d'erreur
  private getFirstErrorMessage() {
    for (let controlName in this.loginForm.controls) {
      let control: AbstractControl = this.loginForm.controls[controlName];
      if (control.errors) {
        this.error = this.errorMessages[controlName]?.[Object.keys(control.errors)[0]] ?? 'Erreur';
        break;
      }
    }
  }

}
