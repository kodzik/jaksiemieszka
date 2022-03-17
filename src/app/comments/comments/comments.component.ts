import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../../_services/comment.service';

const COMMENTS = [
  // {id: '1'}
  { id: '1', username:'Superman', date: new Date(), location: {lat: 52.223142679517, lng: 20.910263299484}, 
    rating:{        
      location: 1,
      air: 1,
      noise: 1,
      education: 1,
      sport: 1,
      culture: 1,
      traffic: 4,
    },
    avg: 4
  },
  // { id: '2', username:'Elo', date: "6/15/19, 10:54 PM", location: {lat: 52.261252543145, lng: 21.024761437893} },

  // { id: '3', username:'asdasd', date: "6/15/19, 10:54 PM" },
  // { id: '4', username:'qweqwe', date: "6/15/19, 10:54 PM" },
];

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {

  comments = COMMENTS;

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    // this.comments = []
    // this.commentService.newComment.subscribe(comment => {
    //   console.warn("chujwdupe nowe komcie:", comment);
      
    //   this.comments.push(comment);
    // });


    // this.comments = this.commentService.comments <========= TO MA WRÓCIĆ



    // this.comments.push({ id: '1', username:'Superman', date: new Date(), location: {lat: 52.223142679517, lng: 20.910263299484} });
  }

}
