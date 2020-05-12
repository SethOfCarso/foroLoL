import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  idPost: number;
  postDetail;
  postDetailSubscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) {
    this.route.params.subscribe((params) => { this.idPost = params.id;})
    this.postService.loadPostByPostId(this.idPost);
    this.postService.postDetailSubject.subscribe((data) => {
      this.postDetail = data;
      window.setTimeout(()=>{
        if(this.postDetail == undefined || this.postDetail.length == 0 ){
          console.log("Es 0");
          this.router.navigate(['/404/']);
        }
      },2000)
      
      console.log(this.postDetail);
    })
  }



  ngOnInit(): void {
  }

  deletePost(){
    this.postService.deletePost(this.idPost);
    console.log("Entre al delete");
    this.router.navigate(['/404']);
  }

}
