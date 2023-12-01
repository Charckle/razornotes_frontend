import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from "./modules/app-routing/app-routing.module";

import { FrameworkComponent } from './shared/components/framework/framework.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FrameworkComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
