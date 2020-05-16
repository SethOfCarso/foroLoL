import { Injectable } from '@angular/core';
import { User } from './User';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  isLoggedIn: boolean;
  userSubject = new BehaviorSubject<User>(new User());
  allUsers: User[];
  allUsersSubject = new BehaviorSubject<User[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {
    super();

    authService.isLoggedInSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.loadUser();
    }
  }

  getAllUsers() {
    return this.allUsers.slice();
  }

  loadAllUsers() {
    this.http.get(this.getEnvironmentUrl() + '/api/users/get/GetAll').subscribe(
      (data: User[]) => {
        this.allUsers = data;
        this.allUsersSubject.next(this.getAllUsers());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Post');
  }

  loadUser() {
    const token = this.authService.getToken();
    const tokenData = this.authService.getTokenData();

    const headers = new HttpHeaders({
      'x-auth': token
    });
    const options = { headers };

    this.http.get(this.getEnvironmentUrl() + '/api/users/' + tokenData.email, options).subscribe(
      (user: User) => {
        this.userSubject.next(user);
      },
      (responseError) => {
        alert(responseError.error.msg);
      }
    );
  }

  getUsersByUsername(username) {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'x-auth': token
    });
    const options = { headers };

    return this.http.get(this.getEnvironmentUrl() + '/api/users?username=' + username, options).toPromise();
  }

  changeEmail(newEmail): Observable<any> {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.put(this.getEnvironmentUrl() + '/api/users/' + tokenData.email, { email: newEmail }, options);
  }

  changePassword(password): Observable<any> {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.put(this.getEnvironmentUrl() + '/api/users/' + tokenData.email, { password }, options);
  }

  changeUsername(username): Observable<any> {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.put(this.getEnvironmentUrl() + '/api/users/' + tokenData.email, { username }, options);
  }

  updateUser(updatedUser) {
    const tokenData = this.authService.getTokenData();
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    this.http.put(this.getEnvironmentUrl() + '/api/users/' + tokenData.email, updatedUser, options).subscribe(
      (user: User) => { this.userSubject.next(user); },
      () => {}
    );
  }
}
