import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-main',
  templateUrl: './post-main.component.html',
  styleUrls: ['./post-main.component.scss']
})
export class PostMainComponent implements OnInit {
  title:string

  constructor() { }

  ngOnInit(): void {
  }

}
