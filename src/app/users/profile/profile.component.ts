import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../User';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post-main/post.service';
import { Post } from '../../post/post-main/post';
import { SummonerInfo } from '../SummonerInfo';
import { Utils } from '../Utils';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isloggedIn: boolean;
  user: User;
  environment: string;
  summonerInfo: SummonerInfo;
  userRankImage: string;
  postByUser: Post[];

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private postService: PostService) {

    this.environment = usersService.getEnvironmentUrl();
    this.summonerInfo = new SummonerInfo();
    this.user = new User();
    this.userRankImage = Utils.getRankImage(this.user);

    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe(isloggedIn => this.isloggedIn = isloggedIn);

    // Subscribe to user
    this.usersService.userSubject.subscribe(user => {
      this.user = user;
      this.postService.loadPostByEmail(this.user.email);
    });

    this.postService.postsEmailSubject.subscribe((post) => {
      this.postByUser = post;
    });

    if (!this.isloggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  emailChanged(user) {
    this.authService.logout();
    alert('Su email cambió, por favor vuelva a iniciar sesión');
    $('#modalChangeEmail').modal('hide');
    this.router.navigate(['/']);
  }

  passwordChanged(user) {
    $('#modalChangePassword').modal('hide');
  }

  usernameChanged(user) {
    this.usersService.updateUser(user);
    $('#modalChangeUsername').modal('hide');
  }

  imageChanged(image) {
    this.user.urlImage = image.filename;
    this.usersService.updateUser(this.user);
    $('#modalChangeImage').modal('hide');
  }
}
