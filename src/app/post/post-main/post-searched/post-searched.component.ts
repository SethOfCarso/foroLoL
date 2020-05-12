import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-searched',
  templateUrl: './post-searched.component.html',
  styleUrls: ['./post-searched.component.scss']
})
export class PostSearchedComponent implements OnInit {
  allPost: Post[];
  allPostTag: Post[];
  allUsers: User;
  tags: string;
  selectedSort: string;
  searchedType: string;
  searchedPost: string;
  selectedTag: string;
  array0Alert = false;
  rankUser = 2;
  postUser = 3;

  postSubscription = new Subscription();
  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private userService: UsersService) {
    this.route.params.subscribe((params) => {
      this.searchedPost = params.postType;
      this.searchedType = this.searchedPost.slice(0, 2);
      this.searchedPost = this.searchedPost.slice(2, this.searchedPost.length)
      if (this.searchedType === 'ta') {
        this.searchTag(this.searchedPost)
      } else if (this.searchedType === 'ti') {
        this.searchTitle(this.searchedPost)
      } else {
        this.router.navigate(['/sde']);
      }
    })
    this.postService.postsTitleSubject.subscribe(data => { this.allPost = data; })
    this.allPost = postService.getPost();
    this.selectedSort = "newestPost"
    this.sortBy();
    // this.allUsers = userService.loadUser();
  }

  ngOnInit(): void {
  }

  searchTitle(title) {
    this.postService.loadPostsByTitleLike(title);
    this.postService.postsTitleSubject.subscribe(data => {
      this.allPost = data;
      if (this.allPost.length < 1) {
        this.array0Alert = true;
      } else {
        this.array0Alert = false;
      }
    })
    this.allPost = this.postService.getPostByTitle();


  }

  searchTag(tag) {
    this.postService.loadPostsByTag(tag);
    this.postService.postsTagsSubject.subscribe(data => {
      this.allPostTag = data;
      if (this.allPostTag.length < 1) {
        this.array0Alert = true;
      } else {
        this.array0Alert = false;
      }
    })
    this.allPostTag = this.postService.getPostByTitle();

  }

  sortBy() {
    switch (this.selectedSort) {
      case "mostComents": {
        break;
      }
      case "leastComents": {
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
