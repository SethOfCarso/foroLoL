import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../User';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isloggedIn: boolean;
  user: User;

  constructor(private router: Router,  private authService: AuthService, private usersService: UsersService) {
    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe((isloggedIn) => {
      this.isloggedIn = isloggedIn;
    });

    // Subscribe to user
    this.usersService.userSubject.subscribe((user) => {
      this.user = user;
    });

    if (!this.isloggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  emailChanged(data) {
    this.authService.logout();
    alert('Su email cambió, por favor vuelva a iniciar sesión');
    $('#modalChangeEmail').modal('hide');
    this.router.navigate(['/']);
  }

}
