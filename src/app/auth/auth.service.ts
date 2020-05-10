import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  token = '';

  constructor(private http: HttpClient) { }

  private updateLoggedInSubject() {
    const tokenData = this.getTokenData();
    let loggedIn = false;

    if (tokenData) {
      loggedIn = tokenData.exp > Date.now() / 1000;
    }

    this.isLoggedInSubject.next(loggedIn);
  }

  public successfulLogIn() {
    this.isLoggedInSubject.next(true);
  }

  public getToken() {
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

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
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
      // Delete user's token from DB
      this.http.post(environment.url + '/api/auth/logout', null, options).subscribe(
        () => {},
        () => {}
      );

      // Delete local token
      this.token = '';
      localStorage.setItem('token', '');

      // Update subject
      this.updateLoggedInSubject();
    }
  }

  public signin(email, password, username) {
    const newUser = {
      email,
      password,
      username,
      urlImage: 'default_profile.png',
      level: 0,
      favorites: [],
      posts: [],
      token: ''
    };

    return this.http
      .post(environment.url + '/api/auth/signin', newUser)
      .pipe( // Preprocess response
        map((data: any) => {
          if (data.token) {
            this.saveToken(data.token);
          }

          return data;
        })
      );
  }

  private isLoggedIn() {
    const tokenData = this.getTokenData();
    let loggedIn = false;

    if (tokenData) {
      loggedIn = tokenData.exp > Date.now() / 1000;
    }

    return loggedIn;
  }
}
