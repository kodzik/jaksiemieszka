import {
  SnapshotOptions,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';
import { LatLng } from 'leaflet';

export interface ICommentAddress {
  road?: string;
  houseNumber?: string | null;
  suburb?: string;
  neighbourhood?: string;
  quarter?: string;
}

export interface IComment {
  id: string;
  userName: string;
  location: LatLng; //{ lat: number; lng: number };
  rating: {
    location: number;
    air: number;
    noise: number;
    traffic: number;
  };
  address: ICommentAddress;
  whenCreated: Date;
  lastModified: Date;
  avgRating?: number;
  textContent?: string;
}

export class CCommentAddress implements ICommentAddress {
  road: string = '';
  house_number: string | null = '';
  suburb: string = '';
  neighbourhood: string = '';
  quarter: string = '';
}

export class CComment implements IComment {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly location: LatLng,
    readonly rating: {
      location: number;
      air: number;
      noise: number;
      traffic: number;
    },
    readonly address: ICommentAddress,
    readonly whenCreated: Date,
    readonly lastModified: Date,
    readonly textContent: string,
    readonly avgRating?: number
  ) {}
}

// Firestore data converter
export const commentConverter = {
  toFirestore: (comment: IComment) => {
    const locationConverted: GeoPoint = new GeoPoint(
      comment.location.lat,
      comment.location.lng
    );

    return {
      userName: comment.userName,
      avgRating: comment.avgRating,
      location: locationConverted,
      rating: { ...comment.rating },
      address: { ...comment.address },
      whenCreated: comment.whenCreated.getTime(),
      lastModified: comment.lastModified.getTime(),
      textContent: comment.textContent,
    };
  },
  fromFirestore: (
    // snapshot: QueryDocumentSnapshot<IComment>,
    // options: any
    snapshot: any,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new CComment(
      data.id,
      data.userName,
      new LatLng(data.location.latitude, data.location.longitude),
      { ...data.rating },
      { ...data.commentAddress },
      new Date(data.whenCreated.seconds * 1000),
      new Date(data.lastModified.seconds * 1000),
      data.textContent,
      data.avgRating
    );
  },
};
