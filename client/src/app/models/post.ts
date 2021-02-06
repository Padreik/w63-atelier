import {User} from "./user";

export class Post {
    _id: string;
    title: string;
    message: string;
    date: Date|string;
    author: User|null; // Sur un get author existe, sur un create il n'existe pas
}
