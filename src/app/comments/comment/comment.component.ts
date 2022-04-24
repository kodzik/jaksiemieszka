import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../_models/comment';
import { MarkerService } from '../../_services/marker.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '500px',
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.7,
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class CommentComponent implements OnInit {
  
  @Input() comment: IComment;

  changeText: boolean;
  rating: number;
  markerData: any;

  isOpen: boolean = false;

  constructor(
    private markerService: MarkerService,
    ) { }

  ngOnInit(): void {    
     this.rating = this.markerService.calculateAvgScore(this.comment);
  }

  expandDiv(e: any){
    this.isOpen = !this.isOpen;
  }

  //TODO move to markerservice
  highlightMarker() { 
    const marker = this.markerService.markersWithId.find(e => e.id === this.comment.id);
    marker.group.getLayers(marker)[0]
    .openPopup();
  }

}
