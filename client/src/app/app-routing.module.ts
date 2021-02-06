import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReadAllComponent} from "./read-all/read-all.component";
import {NewComponent} from "./crud/new/new.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ReadComponent} from "./crud/read/read.component";
import {EditComponent} from "./crud/edit/edit.component";

const routes: Routes = [
  { path: '', component: ReadAllComponent },
  { path: 'read', component: ReadComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
