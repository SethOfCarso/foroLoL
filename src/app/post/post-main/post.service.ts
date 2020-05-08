import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  newURL: string;
  urlGetPost = 'http://localhost:3000/api/post';

  posts: Post[] = [];
  postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {
    this.loadAllPost();
    this.postsSubject.next(this.getPost());
   }



   getPost(): Post[] {
     return this.posts.slice();
   }

   addPost(){

   }

   deletePost(postID){
    //  TODO add return something if true or false
   }

   putPost(postID){

   }



  //  ===========================================
  //  Get post form server
  //  ===========================================
  loadAllPost() {
    this.http.get(this.urlGetPost).subscribe(
      (data: Post[]) => {
        this.posts = data;
        this.postsSubject.next(this.getPost());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Post');
   }

   loadPostByPostId(postID) {
     this.newURL = this.urlGetPost + '/' + postID + '/post/post';
     this.http.get(this.newURL).subscribe(
      (data: Post[]) => {
        this.posts = data;
        this.postsSubject.next(this.getPost());
      },
      (err) => (console.log(err))
    );
     console.log('Entre a load Post por ID');
   }

   loadPostsByUserId(userID) {
    this.newURL = this.urlGetPost + '/' + userID + '/post/user';
    this.http.get(this.newURL).subscribe(
     (data: Post[]) => {
       this.posts = data;
       this.postsSubject.next(this.getPost());
     },
     (err) => (console.log(err))
   );
    console.log('Entre a load Posts por UserID');
  }

  loadPostsByTitleLike(title) {
    this.newURL = this.urlGetPost + '/' + title + '/post/title';
    this.http.get(this.newURL).subscribe(
     (data: Post[]) => {
       this.posts = data;
       this.postsSubject.next(this.getPost());
     },
     (err) => (console.log(err))
   );
    console.log('Entre a load Posts by title like');
  }

  loadPostsByTag(tag) {
    this.newURL = this.urlGetPost + '/' + tag + '/post/tag';
    this.http.get(this.newURL).subscribe(
     (data: Post[]) => {
       this.posts = data;
       this.postsSubject.next(this.getPost());
     },
     (err) => (console.log(err))
   );
    console.log('Entre a load Posts by tag');
  }

  deletePostByPostID(postID){
    console.log("Delete Post in service");
    this.newURL = this.urlGetPost + '/' + postID + '/post/tag';
  }

  updatePostByPostID(postID){

  }



}
