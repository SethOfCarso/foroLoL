import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  environment: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private usersService: UsersService) {
    this.user.email = 'user@mail.com';
    this.user.username = 'Username';
    this.user.urlImage = 'default_profile.png';
    this.user.level = 0;
    this.user.token = '';
    this.user.posts = [];
    this.user.favorites = [];

    this.environment = usersService.getEnvironmentUrl();

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

  ngOnInit(): void {
  }

}
