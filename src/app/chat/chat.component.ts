import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  hidden: boolean;

  constructor() {
    this.hidden = true;
  }

  ngOnInit(): void {
  }

  toggleChatVisibility() {
    this.hidden = !this.hidden;
  }

}
