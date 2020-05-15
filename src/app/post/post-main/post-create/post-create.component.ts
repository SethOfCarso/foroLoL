import { Component, OnInit, ViewChild, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/users/User';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  randomNumber = this.randomID();
  post = {
    id: this.randomNumber,
    idPost: this.randomNumber,
    userEmail: 'prueba@gmail.com',
    userId: 7438,
    url: "NA",
    title: "",
    content: "",
    postDate: new Date(),
    // postDate: '2020-04-24T05:16:36.551+00:00',
    tags: [],
    objPost: []
  }
  tag1 = false;
  isDone = false;
  isloggedIn: boolean;
  user: User;
  userEmail: string;
  userLogged = {
    email:"",
    username: "",
    level: 1,
    posts: 1,
    url: "",
  }
  environment: string;


  constructor(private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService) {
    this.environment = usersService.getEnvironmentUrl();
    this.randomID();
    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe(isloggedIn => this.isloggedIn = isloggedIn);

    // Subscribe to user
    this.usersService.userSubject.subscribe(user => {
      this.user = user
      this.userLogged.email = user.email;
      this.userLogged.username = user.username;
      if(user.level == 0){this.userLogged.level = 1} else this.userLogged.level = user.level;
      if(user.posts == undefined){this.userLogged.posts = 1} 
        else if (user.posts.length <= 1){{this.userLogged.posts = 1}
        } else this.userLogged.posts = user.posts.length;
      this.userLogged.url = user.urlImage;
      // this.post.userEmail = user.email;
    });

    this.postService.createPostDone.subscribe((data) => {
      this.isDone = data
      if (this.isDone == true) { this.postCreated(); }
    }

    );
  }

  ngOnInit(): void {
  }


  createPost(form: NgForm) {
    console.log(this.post);
    console.log('aquí se guardan los datos procesados');
  }
  validar() {
    for (let i = 0; i <= 5; i++) {
      if (this.post.tags[i] === true) { this.post.tags[i] = "" + i + ""; }
      else { this.post.tags[i] = "" + 0 + ""; }
    }
    if (this.post.title.length >= 5) {
      // console.log(this.post);
      this.post.userEmail = this.userLogged.email;
      let postString = this.post;
      console.log(this.postService.addPost(postString));
      // console.log(postString);
      this.isDone = true;
    }
  }

  randomID(): number { return Math.floor(Math.random() * 100000) + 1; }

  changePost() {
    this.isDone = false;
    this.postService.createPostDone.next(false);
    this.router.navigate(['/home/post-detail/' + this.post.idPost]);
  }

  postCreated() {
    window.setTimeout(() => {
      this.changePost();
    }, 2000)
  }
}