import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  allPost : Post[];
  postSubscription = new Subscription();


  constructor(private postService:PostService) {
    this.postService.postsSubject.subscribe(data =>{this.allPost = data;})
    this.allPost = postService.getPost();
   }
   

  ngOnInit(): void {
  }

}
