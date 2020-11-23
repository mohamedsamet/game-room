import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROOMS_PER_PAGE } from '../constants/rooms.constant';
import { PagesModel } from '../models/paginator/pages.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() totalResult: number;
  @Output() selectedPageEvent = new EventEmitter<number>();
  public pagesArray: PagesModel[];
  public selectedPage = 1;
  constructor() {}

  getPagesArray(): PagesModel[] {
    console.log(this.selectedPage)
    return Array(this.getPagesNumber()).fill(0).map((page, i) => {
      return {
        page: i + 1,
        selected: i + 1 === this.selectedPage
      };
    });
  }

  getPagesNumber(): number {
    return Math.trunc((this.totalResult / ROOMS_PER_PAGE) + 1);
  }

  selectPage(page: number): void {
    this.selectedPageEvent.emit(page);
  }

  setInitPage(): void {
    if (this.totalResult) {
      this.pagesArray.map(pageElem => {
        pageElem.selected = pageElem.page === 0;
      });
    }
  }

}
