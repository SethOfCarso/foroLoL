import { PostComponent } from '../post.component';

export class Post {
    id: number;
    idPost: number;
    userId: number;
    userEmail: string;
    url: string;
    title: string;
    content: string;
    postDate: string;
    tags: [];
    objtPost: {};

    constructor(
        id: number,
        idPost: number,
        userId: number,
        userEmail: string,
        url: string,
        title: string,
        content: string,
        postDate: string,
        tags: [],
        objtPost: {} )
    {
        this.id = id;
        this.idPost = idPost;
        this.userId = userId;
        this.userEmail = userEmail;
        this.url = url;
        this.title = title;
        this.content = content;
        this.postDate = postDate;
        this.tags = tags;
        this.objtPost = objtPost;
    }
}
