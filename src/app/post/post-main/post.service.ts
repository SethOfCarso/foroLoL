import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Subject, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
  newURL: string;
  urlGetPost = this.getEnvironmentUrl() + '/api/post';

  singlePost: Post[] = [];
  posts: Post[] = [];
  postTitle: Post[] = [];
  postTag: Post[] = [];
  postEmail: Post[] = [];
  postsEmailSubject = new BehaviorSubject<Post[]>([]);
  postsSubject = new BehaviorSubject<Post[]>([]);
  postsTitleSubject = new BehaviorSubject<Post[]>([]);
  postsTagsSubject = new BehaviorSubject<Post[]>([]);
  postDetailSubject = new BehaviorSubject<Post[]>([]);
  createPostDone = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    super();
    this.loadAllPost();
    this.postsSubject.next(this.getPost());
  }



  getPost(): Post[] {
    return this.posts.slice();
  }

  getPostByEmail(): Post[] {
    return this.postEmail.slice();
  }

  getPostByIdPost(): Post [] {
    return this.singlePost.slice();
  }

  getPostByTitle(): Post[]{
    return this.postTitle.slice();
  }

  getPostByTag(){
    return this.postTag.slice();
  }


  addPost(postString) {
    let urlPost = this.urlGetPost;
    postString = JSON.parse(JSON.stringify(postString))
    this.http.post(this.urlGetPost, postString).subscribe(
      (data) => {
        this.createPostDone.next(true);
      },
      (err) => (console.log(err))
    );
  }

  deletePost(postID) {
    this.newURL = this.urlGetPost + '/' + postID + '/post/post';
    this.http.delete(this.newURL).subscribe(
      (data) => {
        console.log("Todo bien");
        console.log(data);
      },
      (err) => (console.log(err))
    );
    console.log('Entre delete Posts por PostID');
  }

  putPost(postID, postBody) {
    this.newURL = this.urlGetPost + '/' + postID + '/post/post';
    this.http.put(this.newURL,postBody).subscribe(
      (data) => {
        console.log("Todo bien entre al put");
        console.log(data);
      },
      (err) => (console.log(err))
    );
    console.log('Entre a put Posts por PostID');
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

  loadPostByEmail(email) {
    
    // this.newURL = this.urlGetPost + '/' + email + '/post/user';
    this.newURL = this.urlGetPost + '/'+email+'/post/user';
    // console.log(this.newURL);
    this.http.get(this.newURL).subscribe(
      (data: Post[]) => {
        this.postEmail = data;
        this.postsEmailSubject.next(this.getPostByEmail());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Posts por Email');
  }

  loadPostByPostId(postID) {
    this.newURL = this.urlGetPost + '/' + postID + '/post/post';
    this.http.get(this.newURL).subscribe(
      (data: Post[]) => {
        this.singlePost = data;
        this.postDetailSubject.next(this.getPostByIdPost());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Posts por PostID');
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
        this.postTitle = data;
        this.postsTitleSubject.next(this.getPostByTitle());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Posts by title like');
  }

  loadPostsByTag(tag) {
    this.newURL = this.urlGetPost + '/' + tag + '/post/tag';
    this.http.get(this.newURL).subscribe(
      (data: Post[]) => {
        this.postTag = data;
        this.postsTagsSubject.next(this.getPostByTag());
      },
      (err) => (console.log(err))
    );
    console.log('Entre a load Posts by tag');
  }

  deletePostByPostID(postID) {
    console.log("Delete Post in service");
    this.newURL = this.urlGetPost + '/' + postID + '/post/tag';
  }

  updatePostByPostID(postID) {

  }



}
