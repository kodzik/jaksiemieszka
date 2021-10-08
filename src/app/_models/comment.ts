
export interface IComment {
    id: string;
    username: string;
    date: Date;
    location: {lat: number, lng: number};
    rating: {
        location: number ;
        air: number;
        noise: number;
        education: number;
        sport: number;
        culture: number;
        traffic: number;
    };
    avg: number;
    content?: string;
}

export class CComment implements IComment {
    id: string;
    username: string;
    date: Date;
    location: {lat: number, lng: number};
    rating: {
        location: number;
        air: number;
        noise: number;
        education: number;
        sport: number;
        culture: number;
        traffic: number;
    };
    avg: number = 0;
    content?: string;
}