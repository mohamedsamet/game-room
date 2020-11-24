import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ROOMS_PER_PAGE } from '../constants/rooms.constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnChanges {
  @Input() totalResult: number;
  @Output() selectedPageEvent = new EventEmitter<number>();
  public pagesArray: number[];
  public selectedPage = 1;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalResult && this.totalResult) {
      this.pagesArray = this.getPagesArray();
    }
  }

  getPagesArray(): number[] {
    return Array(this.getPagesNumber()).fill(0).map((page, i) => i + 1);
  }

  getPagesNumber(): number {
    return Math.ceil(this.totalResult / ROOMS_PER_PAGE);
  }

  selectPage(page: number): void {
    if (page !== this.selectedPage) {
      this.selectedPage = page;
      this.selectedPageEvent.emit(page);
    }
  }

  getPagesExtendedSequence(): number[] {
    const pagesLength = this.pagesArray.length;
    if (this.selectedPage < 4) {
      return [2, 3, 4];
    } else if (this.selectedPage > pagesLength - 3) {
      return [pagesLength - 3, pagesLength - 2, pagesLength - 1];
    } else {
      return [this.selectedPage - 1, this.selectedPage, this.selectedPage + 1];
    }
  }

}
