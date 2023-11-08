import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IComment } from 'src/app/_models/comment';
import { MarkerService } from 'src/app/_services/marker.service';
import { CommentService } from '../../_services/comment.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @ViewChildren(CommentComponent) childComment: QueryList<CommentComponent>;

  comments: IComment[] = [];

  constructor(
    private cmtService: CommentService,
    private markerService: MarkerService
  ) {}

  get loading() {
    return this.cmtService.loadingComments;
  }

  ngOnInit(): void {
    this.cmtService.getComments();

    this.cmtService.newComment.subscribe((comment) => {
      this.comments.push(comment);
    });

    this.markerService.clickedMarker.subscribe((comment) => {
      this.scrollTo(comment);
    });
  }

  isInViewport(element: any) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  scrollTo(e: any) {
    const comment = document.getElementById(e.id);
    // console.log("Is in viewport?", this.isInViewport(comment))

    if (comment !== null) {
      // comment.scrollIntoView({behavior: 'smooth'} );
      comment.scrollIntoView(true);
    }
    this.childComment.forEach((comment) => {
      comment.isOpen = false;
    });
    this.childComment
      .find((childComment) => childComment.comment.id === e.id)
      ?.expandDiv(e);
  }
}
