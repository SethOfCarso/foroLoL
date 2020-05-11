import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketIoService } from './socket-io.service';
import { Conversation } from './Conversation';
import { ChatMessage } from './ChatMessage';
import { UsersService } from '../users/users.service';
import { User } from '../users/User';
import { AuthService } from '../auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  user: User;
  hidden: boolean;
  isLoggedIn: boolean;
  conversations: Conversation[] = [];
  chatSubscription: Subscription;
  msg = '';
  msgList: ChatMessage[] = [];

  constructor(private socketIOService: SocketIoService,
              private usersService: UsersService,
              private authService: AuthService) {
    this.hidden = true;

    // Subscribe to see if user is logged in
    this.authService.isLoggedInSubject.subscribe((isLoggedIn) => this.isLoggedIn = isLoggedIn);

    // Subscribe to user
    this.usersService.userSubject.subscribe((user) => this.user = user);

    // this.conversations.push(new Conversation('default_profile.png', 'General', 'general'));
    this.chatSubscription = this.socketIOService.getMessages().subscribe((chatMessageInfo: string) => {
      // Split ChatMessage
      const chatMessage = chatMessageInfo.split('|');

      // Determine type of message
      let type = '';
      if (chatMessage[0] === 'Server' || chatMessage[0] !== this.user.email) {
        type = 'outgoing';
      } else {
        type = 'incoming';
      }

      // Create the new message
      const message = new ChatMessage(chatMessage[0], chatMessage[1], chatMessage[2], type, chatMessage[4]);

      // Add the message
      this.msgList.push(message);

      // Set scroll to bottom
      setTimeout(() => {
        $('.msg_history').scrollTop( $('.msg_history').prop('scrollHeight'));
      }, 300);
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

  toggleChatVisibility() {
    this.hidden = !this.hidden;

    if (!this.hidden) {
      this.socketIOService.join(this.user.email, this.user.username, this.user.urlImage);
      this.socketIOService.joinRoom(this.user.email, 'general');
    } else {
      this.msgList = [];
      this.msg = '';
      this.socketIOService.exit(this.user.email);
    }
  }

  sendMyMessage() {
    if (this.msg) {
      this.socketIOService.sendMessage(this.user.email, this.msg);
      this.msg = '';
    }
  }

}
