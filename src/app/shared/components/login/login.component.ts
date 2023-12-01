import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../../classes/user";
import { AuthenticationService } from "../../services/authentication.service";
import { HistoryService } from "../../services/history.service";
import { ConnectionService } from "../../services/connection.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService,
    private connectionService: ConnectionService
  ) {}

  protected formError!: string;
  protected credentials: User = {
    _id: 0,
    username: "",
    password: "",
  };
  public header = {
    title: "Sign in",
    subtitle: "",
    sidebar: "",
  };

  public isConnected(): boolean {
    return this.connectionService.isConnected;
  }

  public onLoginSubmit(): void {
    this.formError = "";
    if (!this.credentials.username || !this.credentials.password)
      this.formError = "All fields are required, please try again.";
    else this.doLogin();
  }

  private doLogin(): void {
    this.authenticationService
      .login(this.credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.formError = error.toString();
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl(this.historyService.getLastNonLoginUrl());
      });
  }
}