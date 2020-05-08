import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  idPost: number;
  postDetail : Post;

  constructor(private route:ActivatedRoute, private postService: PostService) {
    this.route.params.subscribe((params) =>{
      this.idPost = params.id;
    })
    this.postDetail = postService.getPostById(this.idPost);
   }

  ngOnInit(): void {
  }

}
