export class Conversation {
    userImage: string;
    username: string;
    room: string;

    constructor(userImage, username, room) {
        this.userImage = userImage;
        this.username = username;
        this.room = room;
    }
}
