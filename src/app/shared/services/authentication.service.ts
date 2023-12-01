import { Inject, Injectable } from "@angular/core";
import { BROWSER_STORAGE } from "../classes/storage";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../classes/user";
import { AuthResponse } from "../classes/auth-response";
import { NotesDataService } from "./notes_data.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private notesDataService: NotesDataService
  ) {}

  public login(user: User): Observable<AuthResponse> {
    return this.notesDataService.login(user).pipe(
      tap((authResponse: AuthResponse) => {
        this.saveToken(authResponse.token);
      })
    );
  }


  public logout(): void {
    this.storage.removeItem("razor-token");
    // remove the token from the app!!!
  }

  public getToken(): string | null {
    return this.storage.getItem("razor-token");
  }

  public saveToken(token: string): void {
    this.storage.setItem("razor-token", token);
  }

  private b64Utf8(input: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(window.atob(input), (character: string) => {
          return "%" + ("00" + character.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token) {
      const payload = JSON.parse(this.b64Utf8(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else return false;
  }

  public getCurrentUser(): User | null {
    let user!: User;
    if (this.isLoggedIn()) {
      let token: string | null = this.getToken();
      if (token) {
        let { username, _id } = JSON.parse(this.b64Utf8(token.split(".")[1]));
        user = { username, _id };
      }
    }
    return user;
  }
}