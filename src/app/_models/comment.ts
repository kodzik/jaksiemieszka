
export class Comment {
    id: string;
    username: string;
    date: Date;
    location: {lat: number, lng: number};
    rating?: {
        location: number;
        air: number;
        noise: number;
    }
    content?: string;
}