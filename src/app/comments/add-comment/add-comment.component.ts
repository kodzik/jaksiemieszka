import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
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

  onSubmit(){
    console.log('onSubmit');
    
  }

}
