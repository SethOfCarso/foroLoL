import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/User';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  allPost: Post[];
  allUsers = [];
  tags:string;
  selectedSort: string;
  selectedTag: string;
  rankUser = 2;
  postUser = 3;

  postSubscription = new Subscription();
  constructor(private postService: PostService, private userService: UsersService) {
    this.postService.postsSubject.subscribe(data => { 
      this.allPost = data;
      this.selectedSort = "newestPost"
      this.sortBy(); 
      this.getUser()
    })
    this.allPost = postService.getPost();
    // this.allUsers = userService.loadUser();
  }


  ngOnInit(): void {
    this.postService.postsSubject.subscribe(data => { 
      this.allPost = data;
      this.selectedSort = "newestPost"
      this.sortBy(); })
    this.allPost = this.postService.getPost();
  }

  getUser(){
    let nombreArray;
    nombreArray = this.userService.getUsersByUsername("JuanPerez");
    nombreArray.then( (res) => {
      console.log(res)
      this.allUsers = nombreArray;
      this.populatePost();
      }
    );
  }

  populatePost(){

  }

  sortBy() {
    switch (this.selectedSort) {
      case "mostComents": {
        console.log("Mostcoments");
        break;
      }
      case "leastComents": {
        console.log("leastComents");
        break;
      }
      case "newestPost": {
        console.log("newestPost");
        this.allPost = this.allPost.sort((a, b) => {
          // const diaA = a.postDate.toString().slice(0, 10);
          // const diaB = b.postDate.toString().slice(0, 10);
          const diaA = a.postDate.toString();
          const diaB = b.postDate.toString();
          const newDiaA = new Date(diaA);
          const newDiaB = new Date(diaB);
          // console.log(newDiaA);
          // console.log(newDiaB);
          // console.log(newDiaA.getTime() - newDiaB.getTime());
          return newDiaB.getTime() - newDiaA.getTime();
        });
        break;
      }
      case "oldestPost": {
        console.log("oldestPost");
        this.allPost = this.allPost.sort((a, b) => {
          // const diaA = a.postDate.toString().slice(0, 10);
          // const diaB = b.postDate.toString().slice(0, 10);
          const diaA = a.postDate.toString();
          const diaB = b.postDate.toString();
          const newDiaA = new Date(diaA);
          const newDiaB = new Date(diaB);
          return newDiaA.getTime() - newDiaB.getTime();
        });
        break;
      }
    }
  }


}
