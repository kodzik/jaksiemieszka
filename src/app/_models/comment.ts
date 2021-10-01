export class Comment {
    id: string;
    username: string;
    date: string;
    location: {lat: number, lon: number}
    content?: string;
}