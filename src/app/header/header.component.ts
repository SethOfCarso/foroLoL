import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) {
    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe((isloggedIn) => {
      this.isLoggedIn = isloggedIn;
    });
  }

  ngOnInit(): void {
  }

  loggedIn() {
    this.authService.successfulLogIn();
    this.usersService.loadUser();
    $('#modalLogin').modal('hide');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  signedIn() {
    this.authService.successfulLogIn();
    this.usersService.loadUser();
    $('#modalRegister').modal('hide');
  }
}
