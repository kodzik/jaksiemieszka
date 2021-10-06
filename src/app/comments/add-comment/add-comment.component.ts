import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  // @Output() commentSubmited = new EventEmitter<string>();
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cmtService: CommentService
    ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      location: [''],
      locationScore: [''],
      noiseScore: [''],
      airScore: [''],
      freeComment: [''],
    });
  }

  get location(){ return this.commentForm.get('location')}
  get locationScore(){ return this.commentForm.get('locationScore')}
  get noiseScore(){ return this.commentForm.get('noiseScore')}
  get airScore(){ return this.commentForm.get('airScore')}
  get freeComment(){ return this.commentForm.get('freeComment');}

  onSubmit(){
    // console.log('onSubmit');
    let comment = new Comment;
    comment.id = '' //TODO Generate id
    comment.date = new Date();
    comment.location = {lat: Number(this.location), lng: Number(this.location)} //TODO get appropriate numbers from location
    comment.rating = {
      air: Number(this.airScore),
      location: Number(this.locationScore),
      noise: Number(this.noiseScore),
    }
    this.cmtService.addnewComment(comment)
  }

}
