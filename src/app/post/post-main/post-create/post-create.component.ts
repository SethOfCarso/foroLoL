import { Component, OnInit, ViewChild, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

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

  constructor(private postService: PostService, private router: Router) {
    this.randomID();
    this.postService.createPostDone.subscribe((data) => {
      this.isDone = data
      if (this.isDone == true) {
        this.postCreated();
      }
    });
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
      let postString = this.post;
      console.log(this.postService.addPost(postString));
      this.isDone = true;
    }
  }

  randomID(): number { return Math.floor(Math.random() * 100000) + 1; }

  changePost() {
    this.isDone= false;
    this.postService.createPostDone.next(false);
    this.router.navigate(['/home/post-detail/' + this.post.idPost]);
  }

  postCreated() {
    window.setTimeout(() => {
      this.changePost();
    }, 2000)
  }
}