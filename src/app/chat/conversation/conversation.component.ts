import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { Conversation } from '../Conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @Input() conversationData: Conversation;
  @Input() index: number;
  @Output() selected = new EventEmitter();
  environment: string;

  constructor(private usersService: UsersService) {
    this.environment = this.usersService.getEnvironmentUrl();
  }

  ngOnInit(): void {
  }

  itemSelected() {
    this.selected.emit(this.index);
  }

}
