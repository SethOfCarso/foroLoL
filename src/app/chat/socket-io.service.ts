import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  chatEvents = {
    join: 'join',
    exit: 'exit',
    joinRoom: 'joinRoom',
    exitRoom: 'exitRoom',
    chat: 'chat'
  };

  constructor(private socket: Socket) { }

  join(email, username, userImage) {
    const user = email + '|' + username + '|' + userImage;
    this.socket.emit(this.chatEvents.join, user);
  }

  exit(email) {
    this.socket.emit(this.chatEvents.exit, email);
  }

  joinRoom(email, room) {
    this.socket.emit(this.chatEvents.joinRoom, email, room);
  }

  sendMessage(email, msg) {
    this.socket.emit(this.chatEvents.chat, email, msg);
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on(this.chatEvents.chat, (msg) => observer.next(msg));
    });
  }
}
