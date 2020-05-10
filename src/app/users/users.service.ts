import { Injectable } from '@angular/core';
import { User } from './User';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userSubject = new BehaviorSubject<User>(new User());

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  loadUser() {
    const token = this.authService.getToken();
    const tokenData = this.authService.getTokenData();

    const headers = new HttpHeaders({
      'x-auth': token
    });
    const options = { headers };

    this.http.get(environment.url + '/api/users/' + tokenData.email, options).subscribe(
      (user: User) => {
        this.userSubject.next(user);
      },
      (responseError) => {
        alert(responseError.error.msg);
      }
    );
  }

  changeEmail(newEmail): Observable<any> {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.put(environment.url + '/api/users/' + tokenData.email, { email: newEmail }, options);
  }

  changePassword(password): Observable<any> {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.put(environment.url + '/api/users/' + tokenData.email, { password }, options);
  }

  updateUser(updatedUser) {
    this.userSubject.next(updatedUser);
  }
}
