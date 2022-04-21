import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.scss']
})
export class FormHelpComponent implements OnInit {

  @Input() item:any;

  autoResize: boolean = false;

  public get topic() : string { return this.item.label }
  rating: number;
  textComment: string;
  
  constructor(private cmtService: CommentService) { }

  ngOnInit(): void {
  }

  next(){

  }

}
