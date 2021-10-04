export class Comment {
    id: string;
    username: string;
    date: Date | string;
    location: {lat: number, lng: number}
    content?: string;
}