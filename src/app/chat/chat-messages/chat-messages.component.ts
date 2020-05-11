import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../ChatMessage';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {
  @Input() chatMessages: ChatMessage[] = [];
  environment: string;


  constructor(private usersService: UsersService) {
    this.environment = this.usersService.getEnvironmentUrl();
  }

  ngOnInit(): void {
  }

}
