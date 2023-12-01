import { Inject, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { AuthResponse } from "../classes/auth-response";
import { BROWSER_STORAGE } from "../classes/storage";
import { environment } from '../../../environments/environment';
import { Note } from "../classes/note";
import { User } from "../classes/user";


@Injectable({
    providedIn: "root",
  })
export class NotesDataService {
    
    dataArray: any[] = [];
    constructor(
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
      ) {}

    private apiUrl = environment.apiUrl;

    public login(user: User): Observable<AuthResponse> {
        return this.makeAuthApiCall("login", user);
      }
    
    
      private makeAuthApiCall(
        urlPath: string,
        user: User
      ): Observable<AuthResponse> {
        const url: string = `${this.apiUrl}/${urlPath}`;
        let body = new HttpParams().set("username", user.username);
        if (user.password) body = body.set("password", user.password);
        let headers = new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        return this.http
          .post<AuthResponse>(url, body, { headers })
          .pipe(retry(1), catchError(this.handleError));
      }

    

    public getPinnedNotes(): Observable<Note[]> {
        const url: string = `${this.apiUrl}/notes/2`;
        /*
        this.http.get<any[]>('http://localhost:5000/api/v2/notes/2').subscribe((data) => {
            // Handle the returned array
            this.dataArray = data;
            console.log(this.dataArray);
          });
        */
        // HEADER
        let headers = this.getHeaders()

        return this.http
        .get<Note[]>(url, { headers })
        .pipe(retry(1), catchError(this.handleError));
    }

    public getIndexNotes(): Observable<Note[]> {
        const url: string = `${this.apiUrl}/notes/1`;
        let headers = this.getHeaders()
        return this.http
        .get<Note[]>(url, { headers })
        .pipe(retry(1), catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(() => error.error.message || error.statusText);
      }
    
    private getHeaders() {
        let headers = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", `Bearer ${this.storage.getItem("razor-token")}`);
        return headers
    }
}
