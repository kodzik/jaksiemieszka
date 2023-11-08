import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CComment, commentConverter, IComment } from '../_models/comment';
import {
  AngularFirestore,
  CollectionReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  loadingComments: boolean = false;

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable(); //comments got from db

  constructor(private db: AngularFirestore) {}

  getCollectionWithConverter(): CollectionReference<CComment> {
    return this.db.firestore
      .collection('comments')
      .withConverter(commentConverter);
  }

  getCommentsQuerySnapshot(): Promise<QuerySnapshot<CComment>> {
    return this.getCollectionWithConverter().get();
  }

  getComments() {
    this.loadingComments = true;
    this.getCommentsQuerySnapshot().then((comments) => {
      from(comments.docs.map((comment) => comment.data())).subscribe(
        (comment) => {
          if (comment) {
            this.newCommentSource.next(comment);
            this.loadingComments = false;
          }
        }
      );
    });
  }

  addNewComment(comment: IComment) {
    return this.db.collection(this.getCollectionWithConverter()).add(comment);
    // .then((response) => console.log(response));
  }
}
