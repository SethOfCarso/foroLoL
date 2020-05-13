import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  environment: string;
  isLoggedIn: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthService) {

    this.authService.isLoggedInSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.user.email = 'user@mail.com';
    this.user.username = 'Username';
    this.user.urlImage = 'default_profile.png';
    this.user.level = 0;
    this.user.token = '';
    this.user.posts = [];
    this.user.favorites = [];
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/home']);
    }

    this.environment = this.usersService.getEnvironmentUrl();

    // Check the query params in the url
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.username) {
        // Get user
        this.usersService.getUsersByUsername(params.username)
          .then((users: User[]) => {
            if (users.length > 0) {
              this.user = users[0];
            } else {
              this.router.navigate(['/home']);
            }
          })
          .catch();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

}
