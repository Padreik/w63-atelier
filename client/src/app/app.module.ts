import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadAllComponent } from './read-all/read-all.component';
import { NewComponent } from './crud/new/new.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { ReadComponent } from './crud/read/read.component';
import { EditComponent } from './crud/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadAllComponent,
    NewComponent,
    LoginComponent,
    MenuComponent,
    ReadComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
