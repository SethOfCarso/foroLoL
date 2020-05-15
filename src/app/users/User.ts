export class User {
    email: string;
    username: string;
    password: string;
    urlImage: string;
    level: number;
    token: string;
    favorites: any[];
    posts: any[];

    constructor() {
        this.email = '';
        this.username = '';
        this.password = '';
        this.urlImage = 'default_profile.png';
        this.level = 0;
        this.token = '';
        this.favorites = [];
        this.posts = [];
    }
}
