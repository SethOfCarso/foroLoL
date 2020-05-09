import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // token = '';
  // constructor(private http: HttpClient) { }

  // private saveToken(token: string) {
  //   localStorage.setItem('token', token);
  //   this.token = token;
  // }

  // public isLoggedIn(): boolean {
  //   const tokenData = this.getTokenData();
  //   console.log(tokenData);

  //   if (tokenData) {
  //     const response = tokenData.exp > Date.now() / 1000;
  //     return response;
  //   } else {
  //     return false;
  //   }
  // }

  // public getTokenData() {
  //   let payload;
  //   if (this.token) {
  //     payload = this.token.split('.')[1];
  //     payload = window.atob(payload);

  //     return JSON.parse(payload);
  //   } else {
  //     return null;
  //   }
  // }

  // public login(name: string, password: string): Observable<any> {
  //   console.log(name, password);
  //   return this.http
  //     .post(environment.url + '/api/login', {name, password})
  //     .pipe( // pipe es para preprocesar la información que te llega
  //       map((data: any) => {
  //         if (data.token) {
  //           this.saveToken(data.token);
  //         }

  //         return data;
  //       })
  //     );
  // }
}
