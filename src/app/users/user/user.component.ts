import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Utils } from '../Utils';
import { Post } from 'src/app/post/post-main/post';
import { PostService } from 'src/app/post/post-main/post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  environment: string;
  isLoggedIn: boolean;
  userRankImage: string;
  postByUser: Post[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthService,
              private postService: PostService) {

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

    this.userRankImage = Utils.getRankImage(this.user);
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
              this.postService.loadPostByEmail(this.user.email);
              this.postService.postsEmailSubject.subscribe((post) => {
                this.postByUser = post;
              });
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
