import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
textArea = document.getElementById('#demo');

  constructor() { 

  }

  ngOnInit(): void {
  }

}
