import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { CComment, IComment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';
import { MarkerService } from 'src/app/_services/marker.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  // @Output() commentSubmited = new EventEmitter<string>();
  commentForm: FormGroup;
  comment: IComment;
  currentLoc: any;

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable();

  constructor(
    private fb: FormBuilder,
    private cmtService: CommentService,
    private markerService: MarkerService,
    ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
    this.markerService.enableMarkers = true;
  }

  createForm() {
    this.commentForm = this.fb.group({
      location: [''],

      locationScore: [''],
      noiseScore: [''],
      airScore: [''],
      cultureScore: [''],
      eduScore: [''],
      sportScore: [''],
      trafficScore: [''],

      freeComment: [''],
    });
  }

  get currentMarker(): any{return this.markerService.currentMarker}

  get location(){ return this.commentForm.get('location')?.value}
  // get location(){ return this.currentMarker}
  get locationScore(){ return this.commentForm.get('locationScore')?.value}
  get noiseScore(){ return this.commentForm.get('noiseScore')?.value}
  get airScore(){ return this.commentForm.get('airScore')?.value}
  get cultureScore(){ return this.commentForm.get('cultureScore')?.value}
  get eduScore(){ return this.commentForm.get('eduScore')?.value}
  get sportScore(){ return this.commentForm.get('sportScore')?.value}
  get trafficScore(){ return this.commentForm.get('trafficScore')?.value}
  get freeComment(){ return this.commentForm.get('freeComment')?.value;}

  addLocation(){
    console.log("On input click");
    this.markerService.enableMarkers = true;
  }

  onSubmit(){
    let comment = new CComment;

    comment.id = String(Math.floor(Math.random() * 100))  //TODO Generate id
    comment.date = new Date();
    comment.location = {lat: Number(this.location), lng: Number(this.location)} //TODO get appropriate numbers from location
    comment.rating = {
      air: Number(this.airScore),
      location: Number(this.locationScore),
      noise: Number(this.noiseScore),
      culture: Number(this.cultureScore),
      education: Number(this.eduScore),
      sport: Number(this.sportScore),
      traffic: Number(this.trafficScore),
      }
    comment.avg = this.cmtService.calculateAvgScore(comment),

    this.cmtService.addnewComment(comment)
    // this.addnewComment(comment)
  }

  addnewComment(comment: IComment){
    console.log("Comment service, new comment:", comment);
    this.newCommentSource.next(comment);
    // this.newCommentSource.next();
  }



  onLocationInputClick(){
  //   console.log("on loc input", this.currentMarker);
  //   this.markerService.enableMarkers = true;
  }

  onLocationInputBlur(){
    console.warn(this.currentMarker);
  }

  ngOnDestroy(): void {
    this.markerService.enableMarkers = false;
  }
}
