import { Component, OnInit } from '@angular/core';
import { Comment } from '../_models/comment';

const COMMENTS = [
  { id: '1', username:'Superman', date: "6/15/19, 10:54 PM" },
  { id: '2', username:'Elo', date: "6/15/19, 10:54 PM" },
  { id: '3', username:'asdasd', date: "6/15/19, 10:54 PM" },
  { id: '4', username:'qweqwe', date: "6/15/19, 10:54 PM" },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comments = COMMENTS;

  constructor() { }

  ngOnInit(): void {
  }

}
