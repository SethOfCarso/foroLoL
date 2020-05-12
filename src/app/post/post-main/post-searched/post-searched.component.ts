import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-searched',
  templateUrl: './post-searched.component.html',
  styleUrls: ['./post-searched.component.scss']
})
export class PostSearchedComponent implements OnInit {
  allPost: Post[];
  allUsers: User;
  selectedSort: string;
  searchedPost: string;
  selectedTag: string;
  rankUser = 2;
  postUser = 3;

  postSubscription = new Subscription();
  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UsersService) {
    this.route.params.subscribe((params) => { this.searchedPost = params.postType; })
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
