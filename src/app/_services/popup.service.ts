import { ElementRef, Injectable } from '@angular/core';
import { commentsView } from '../comments/commentsView';
import { FabService } from '../fab/fab.service';
import { MarkerService } from './marker.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
    `<div>Capital: ${ data.name }</div>` +
    `<div>State: ${ data.state }</div>` +
    `<div>Population: ${ data.population }</div>`
  }



}
