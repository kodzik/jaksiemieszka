
export interface ICommentAddress{
    road?: string;
    house_number?: string | null;
    suburb?: string ;
    neighbourhood?: string ;
    quarter?: string ;
}

export interface IComment {
    id: string;
    username: string;
    location: {lat: number, lng: number};
    rating: {
        location: number;
        air: number;
        noise: number;
        traffic: number;
        // education: number;
        // sport: number;
        // culture: number;
    };
    address: ICommentAddress;
    when_added: Date;
    last_modified: Date;
    avg?: number;
    text_content?: string;
}

export class CCommentAddress implements ICommentAddress {
    road: string = "";
    house_number: string | null = "";
    suburb: string = "";
    neighbourhood: string = "";
    quarter: string = "";
}

export class CComment implements IComment {
    id: string;
    username: string;
    location: {lat: number, lng: number};
    rating: {
        location: number;
        air: number;
        noise: number;
        // education: number;
        // sport: number;
        // culture: number;
        traffic: number;
    };
    address: CCommentAddress;
    when_added: Date;
    last_modified: Date;
    avg: number = 0;
    text_content?: string;


}