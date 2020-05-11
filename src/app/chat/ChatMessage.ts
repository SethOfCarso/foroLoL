export class ChatMessage {
    sender: string;
    userImage: string;
    message: string;
    type: string;
    date: string;

    constructor(sender, userImage, message, type, date) {
        this.sender = sender;
        this.userImage = userImage;
        this.message = message;
        this.type = type;
        this.date = date;
    }
}
