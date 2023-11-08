import { SnapshotOptions } from '@angular/fire/compat/firestore';
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
  authorUid: string;
  userName: string;
  location: LatLng;
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
  houseNumber: string | null = '';
  suburb: string = '';
  neighbourhood: string = '';
  quarter: string = '';
}

export class CCommentHelper implements IComment {
  id: string;
  authorUid: string;
  userName: string;
  location: LatLng;
  rating: {
    location: number;
    air: number;
    noise: number;
    traffic: number;
  };
  address: ICommentAddress;
  whenCreated: Date;
  lastModified: Date;
  textContent: string;
  avgRating?: number;
}

export class CComment implements IComment {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly authorUid: string,
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
    const ratingValues = Object.values(comment.rating);
    const averageRating =
      ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
    return {
      author: comment.authorUid,
      userName: comment.userName,
      avgRating: averageRating,
      location: locationConverted,
      rating: { ...comment.rating },
      address: { ...comment.address },
      whenCreated: comment.whenCreated,
      lastModified: comment.lastModified,
      textContent: comment.textContent,
    };
  },
  fromFirestore: (snapshot: any, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new CComment(
      snapshot.id,
      data.userName,
      data.author,
      new LatLng(data.location.latitude, data.location.longitude),
      { ...data.rating },
      { ...data.address },
      new Date(data.whenCreated.seconds * 1000),
      new Date(data.lastModified.seconds * 1000),
      data.textContent,
      data.avgRating
    );
  },
};
