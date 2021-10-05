export class Comment {
    id: string;
    username: string;
    date: Date;
    location: {lat: number, lng: number}
    content?: string;
}