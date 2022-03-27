import { Component, OnInit } from '@angular/core';
import { CComment, IComment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comm-form',
  templateUrl: './comm-form.component.html',
  styleUrls: ['./comm-form.component.scss']
})
export class CommFormComponent implements OnInit {

  comment: IComment;

  constructor() { }

  ngOnInit(): void {
    // this.comment = new CComment;
    this.getKeys()
  }

  getKeys(){
    let keys = Object.keys(this.comment)
  }

  load(): void{
    
  }

}
