export class Conversation {
    userEmail: string;
    userImage: string;
    username: string;
    room: string;
    selected: boolean;

    constructor(userEmail, userImage, username, room, selected) {
        this.userEmail = userEmail;
        this.userImage = userImage;
        this.username = username;
        this.room = room;
        this.selected = selected;
    }
}
