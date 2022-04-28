import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { commentsView } from '../comments/commentsView';

@Injectable({
  providedIn: 'root'
})
export class FabService {

  private commentsViewSource = new BehaviorSubject<commentsView>(commentsView.View);
  commentsView = this.commentsViewSource.asObservable();

  private toggleDistricsSource = new BehaviorSubject<boolean>(false);
  toggleDistricts = this.toggleDistricsSource.asObservable();

  constructor() {}

  changeCommentsView(change: commentsView): void{
    this.commentsViewSource.next(change);
  }

  toggleDistrictsLayer(change: boolean): void{
    this.toggleDistricsSource.next(change);
  }
}
