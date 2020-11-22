import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() pagesNumber: number;
  @Output() selectedPageEvent = new EventEmitter<number>();
  public selectedPage: number;
  constructor() {}

  getPagesArray(): number[] {
    return Array(this.pagesNumber).fill(0).map((page, i) => i);
  }

  selectPage(page: number) {
    this.selectedPage = page;
    this.selectedPageEvent.emit(page);
  }

}
