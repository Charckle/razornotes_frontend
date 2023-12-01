import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from '../../shared/components/home/home.component';
import { LoginComponent } from '../../shared/components/login/login.component';
import { LogoutComponent } from '../../shared/components/logout/logout.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard]},
    { path: "search", component: HomeComponent },
    { path: "note_new", component: HomeComponent },
    { path: "note_all", component: HomeComponent},
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "", pathMatch: 'full' }
  ];
  
  @NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}