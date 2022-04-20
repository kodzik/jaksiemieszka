import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IComment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  item: any;
  comment: IComment;
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Lokalizacja'},
      {label: 'Hałas'},
      {label: 'Jakość powietrza'},
      {label: 'Korki'}
    ];
    this.item = this.items[this.activeIndex]
  }

  load(){
    this.activeIndex = (this.activeIndex + 1)%this.items.length 
    this.item = this.items[this.activeIndex]
  }

}
