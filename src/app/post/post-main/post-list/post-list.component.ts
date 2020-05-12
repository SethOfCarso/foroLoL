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
  allUsers: User;
  selectedSort: string;
  selectedTag: string;
  rankUser = 2;
  postUser = 3;

  postSubscription = new Subscription();
  constructor(private postService: PostService, private userService: UsersService) {
    this.postService.postsSubject.subscribe(data => { this.allPost = data; })
    this.allPost = postService.getPost();
    this.selectedSort = "newestPost"
    this.sortBy();
    this.userService.userSubject.subscribe(data => {
      this.allUsers = data
      // console.log(data);
    });
    // this.allUsers = userService.loadUser();
  }


  ngOnInit(): void {
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
          const diaA = a.postDate.toString().slice(0, 10);
          const diaB = b.postDate.toString().slice(0, 10);
          const newDiaA = new Date(diaA);
          const newDiaB = new Date(diaB);
          return newDiaB.getTime() - newDiaA.getTime();
        });
        break;
      }
      case "oldestPost": {
        console.log("oldestPost");
        this.allPost = this.allPost.sort((a, b) => {
          const diaA = a.postDate.toString().slice(0, 10);
          const diaB = b.postDate.toString().slice(0, 10);
          const newDiaA = new Date(diaA);
          const newDiaB = new Date(diaB);
          return newDiaA.getTime() - newDiaB.getTime();
        });
        break;
      }
    }
  }


}
