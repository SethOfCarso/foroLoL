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

  postComent= {
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
    objtPost: []
  }

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private postService: PostService,
              private authService: AuthService,
              private usersService: UsersService) {
    this.route.params.subscribe((params) => { this.idPost = params.id;})
    this.postService.loadPostByPostId(this.idPost);
    this.postService.postDetailSubject.subscribe((data) => {
      this.postDetail = data;
      window.setTimeout(()=>{
        if(this.postDetail == undefined || this.postDetail.length == 0 ){
          this.router.navigate(['/404/']);}},2000)
      this.randomID();
    })
    // Subscribe to know if user is logged in
    this.authService.isLoggedInSubject.subscribe((isloggedIn) => this.isLoggedIn = isloggedIn);

    // Subscribe to user
    this.usersService.userSubject.subscribe((user) => this.user = user);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void {
  }

  randomID(): number { return Math.floor(Math.random() * 100000) + 1; }

  deletePost(){
    this.postService.deletePost(this.idPost);
    console.log("Entre al delete");
    this.router.navigate(['/404']);
  }

  postPost(){
    this.postComent= {
      id: this.randomNumber,
      idPost: this.randomNumber,
      userEmail: 'prueba@gmail.com',
      userId: 7438,
      url: "NA",
      title: this.postDetail[0].title,
      content: this.postComent.content,
      postDate: new Date(),
      // postDate: '2020-04-24T05:16:36.551+00:00',
      tags: [],
      objtPost: []
    }
    let newArray = this.postDetail[0].objtPost
    newArray.push(this.postComent);
    this.postDetail[0].objtPost = newArray;
    // console.log(this.postDetail[0]);
    this.postService.putPost(this.idPost,this.postDetail[0])
  }

  answerPost(){
    this.activeComment= true;
  }

  comnetPost(){
    this.activeComment= true;
  }

}
