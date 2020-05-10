import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  loggedIn() {
    this.isLoggedIn = true;
    $('#modalLogin').modal('hide');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.navigate(['/']);
  }

  signedIn() {
    this.isLoggedIn = true;
    $('#modalRegister').modal('hide');
  }
}
