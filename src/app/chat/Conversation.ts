export class Conversation {
    userImage: string;
    username: string;
    room: string;
    selected: boolean;

    constructor(userImage, username, room, selected) {
        this.userImage = userImage;
        this.username = username;
        this.room = room;
        this.selected = selected;
    }
}
