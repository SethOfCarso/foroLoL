import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  constructor(private http: HttpClient) { }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public isLoggedIn(): boolean {
    const tokenData = this.getTokenData();

    if (tokenData) {
      const response = tokenData.exp > Date.now() / 1000;
      return response;
    } else {
      return false;
    }
  }

  public getTokenData() {
    let payload;

    // Token from service
    if (this.token) {
      payload = this.token.split('.')[1];
      payload = window.atob(payload);

      return JSON.parse(payload);
    } else {
      // Search in localstorage
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        payload = savedToken.split('.')[1];
        payload = window.atob(payload);

        return JSON.parse(payload);
      } else {
        return null;
      }
    }
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(environment.url + '/api/auth/login', {email, password})
      .pipe( // Preprocess response
        map((data: any) => {
          if (data.token) {
            this.saveToken(data.token);
          }

          return data;
        })
      );
  }

   public logout() {
    if (this.isLoggedIn()) {
      const headers = new HttpHeaders({
        'x-auth': this.getToken()
      });
      const options = { headers };
      this.http.post(environment.url + '/api/auth/logout', null, options).subscribe();
      this.token = '';
      localStorage.setItem('token', '');
    }
  }

  private getToken() {
    if (this.token) {
      return this.token;
    } else {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        return savedToken;
      } else {
        return '';
      }
    }
  }
}
