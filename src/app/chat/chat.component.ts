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
  searchString: string;

  chatSubscription: Subscription;
  conversationListennerSubscription: Subscription;

  msg = '';
  msgList: ChatMessage[] = [];
  conversations: Conversation[] = [];

  constructor(private socketIOService: SocketIoService,
              private usersService: UsersService,
              private authService: AuthService) {
    this.hidden = true;

    // Subscribe to see if user is logged in
    this.authService.isLoggedInSubject.subscribe((isLoggedIn) => this.isLoggedIn = isLoggedIn);

    // Subscribe to user
    this.usersService.userSubject.subscribe((user) => this.user = user);

    // Add the global room to the chat
    this.conversations.push(new Conversation('no_email', 'global.png', 'General', 'general', true));

    this.chatSubscription = this.socketIOService.getMessages().subscribe((chatMessageInfo: string) => {
      // Split ChatMessage
      const chatMessage = chatMessageInfo.split('|');

      // Determine type of message
      let type = '';
      if (chatMessage[0] === 'Server' || chatMessage[0] !== this.user.email) {
        type = 'incoming';
      } else {
        type = 'outgoing';
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

    // Conversation listenner
    this.conversationListennerSubscription = this.socketIOService.listenForNewConversation().subscribe(
      (conversationInfo: string) => {
        const conversationInfoSplitted = conversationInfo.split('|');
        const newConversation = new Conversation(
          conversationInfoSplitted[0],
          conversationInfoSplitted[1],
          conversationInfoSplitted[2],
          conversationInfoSplitted[3],
          true
        );

        this.conversations.push(newConversation);
        const conversationIndex = this.conversations.findIndex((c) => c.room === newConversation.room);
        this.conversationSelected(conversationIndex);
        this.msgList = [];

        this.socketIOService.joinRoom(this.user.email, newConversation.room);
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.conversationListennerSubscription.unsubscribe();
  }

  toggleChatVisibility() {
    this.hidden = !this.hidden;

    if (!this.hidden) {
      this.conversationSelected(0);
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

  conversationSelected(elementIndex) {
    this.conversations.forEach((conversation: Conversation, index: number, convs: Conversation[]) => {
      if (index === elementIndex) {
        this.socketIOService.joinRoom(this.user.email, convs[elementIndex].room);
        conversation.selected = true;
      } else {
        conversation.selected = false;
        this.socketIOService.exitRoom(this.user.email, convs[index].room);
      }
    });
    this.msgList = [];
  }

  // If user is found, then begins a new conversation
  searchUser() {
    if (!this.searchString) {
      return;
    }

    this.usersService.getUsersByUsername(this.searchString)
      .then((users: User[]) => {
        if (users.length !== 0) {
          const foundUser = users[0];

          if (foundUser.email !== this.user.email) {
            const hasConversation = this.conversations.find(c => c.userEmail === foundUser.email);

            if (hasConversation) {
              alert('Ya tienes una conversación con ese usuario');
              return;
            }

            // Clean search string
            this.searchString = '';

            // Create the conversation for the other user
            const newConversation = new Conversation(
              this.user.email,
              this.user.urlImage,
              this.user.username,
              this.user.email + '-' + foundUser.email,
              'NotUsed'
            );

            // Create the conversation for the other user
            const myNewConversation = new Conversation(
              foundUser.email,
              foundUser.urlImage,
              foundUser.username,
              this.user.email + '-' + foundUser.email,
              true
            );

            // Update my conversation
            this.conversations.push(myNewConversation);
            const conversationIndex = this.conversations.findIndex((c) => c.room === myNewConversation.room);
            this.conversationSelected(conversationIndex);
            this.msgList = [];

            // Join both users to conversation
            this.socketIOService.requestNewConversation(newConversation);
            this.socketIOService.joinRoom(this.user.email, newConversation.room);
          } else {
            alert('No te puedes iniciar una conversación contigo mismo');
          }
        } else {
          alert('No se encontró al usuario');
        }
      })
      .catch((error) => {
        alert('Hubo un error en la busqueda');
      });
  }

}
