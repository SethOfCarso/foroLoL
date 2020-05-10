import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    userId: 1,
    url: "",
    title: "",
    content: "",
    postDate: new Date(),
    tags: [],
    objtPost: {}
  }
  tag1 = false;

  constructor() {
    this.randomID();
  }

  ngOnInit(): void {
  }

  createPost(form: NgForm) {
    console.log(this.post);
    console.log('aquí se guardan los datos procesados');
  }
  validar() {
    // let content = document.getElementById("content").innerHTML;
    // console.log(content);
    
    console.log(this.post);
    console.log("Se valido");
  }

  randomID():number{return Math.floor(Math.random() * 100000) + 1;}

}
