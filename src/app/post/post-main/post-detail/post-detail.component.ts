import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription, from } from 'rxjs';
import { User } from '../../../users/User'
import { UsersService } from '../../../users/users.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  idPost: number;
  postDetail;
  postDetailSubscription = new Subscription();
  activeComment = false;
  isLoggedIn: boolean;
  user: User;
  randomNumber = this.randomID();
  environment: string;
  allUsers = [];

  postComent = {
    id: this.randomNumber,
    idPost: this.randomNumber,
    userEmail: 'prueba@gmail.com',
    userId: 7438,
    url: "NA",
    title: "",
    content: "",
    postDate: new Date(),
    tags: [],
    objtPost: []
  };
  userLogged = {
    email: "",
    username: "",
    level: 1,
    posts: 1,
    url: "",
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private usersService: UsersService,
    private userService: UsersService) {
    this.environment = usersService.getEnvironmentUrl();
    

    this.route.params.subscribe((params) => { this.idPost = params.id; })
    this.postService.loadPostByPostId(this.idPost);
    this.postService.postDetailSubject.subscribe((data) => {
      this.postDetail = data;
      window.setTimeout(() => {
        if (this.postDetail == undefined || this.postDetail.length == 0) {
          this.router.navigate(['/404/']);
        }
      }, 2000)
      this.randomID();
    })
    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe((isloggedIn) => this.isLoggedIn = isloggedIn);


    // Subscribe to user
    this.usersService.userSubject.subscribe(user => {
      this.user = user
      this.userLogged.email = user.email;
      this.userLogged.username = user.username;
      if (user.level == 0) { this.userLogged.level = 1 } else this.userLogged.level = user.level;
      if (user.posts == undefined) { this.userLogged.posts = 1 }
      else if (user.posts.length <= 1) {
        { this.userLogged.posts = 1 }
      } else this.userLogged.posts = user.posts.length;
      this.userLogged.url = user.urlImage;
      this.postComent.userEmail = user.email;
    });

    // Load all the users
    userService.loadAllUsers();
    this.userService.allUsersSubject.subscribe(data =>{this.allUsers = data;})
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
  }

  randomID(): number { return Math.floor(Math.random() * 100000) + 1; }

  deletePost() {
    this.postService.deletePost(this.idPost);
    console.log("Entre al delete");
    this.router.navigate(['/404']);
  }

  getUser(){
    let nombreArray;
    nombreArray = this.userService.getUsersByUsername("ultry");
    nombreArray.then( (res) => {
      console.log(res)
      this.allUsers = nombreArray;
      }
    );
  }

  postPost() {
    this.postComent = {
      id: this.randomNumber,
      idPost: this.randomNumber,
      userEmail: this.userLogged.email,
      userId: 7438,
      url: "NA",
      title: this.postDetail[0].title,
      content: this.postComent.content,
      postDate: new Date(),
      tags: [],
      objtPost: []
    }
    this.postComent.userEmail = this.userLogged.email;
    let newArray = this.postDetail[0].objtPost
    newArray.push(this.postComent);
    this.postDetail[0].objtPost = newArray;
    // console.log(this.userLogged.email);
    
    console.log(this.postDetail[0]);
    this.postService.putPost(this.idPost, this.postDetail[0])
  }

  answerPost() {
    this.activeComment = true;
  }

  comnetPost() {
    this.activeComment = true;
  }

}
