import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private db: AngularFirestore) {}
}
