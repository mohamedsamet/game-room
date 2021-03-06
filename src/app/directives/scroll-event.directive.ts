import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollEvent]'
})
export class ScrollEventDirective {
  @Output() scrollTopEvent = new EventEmitter<any>();
  @Output() isScrollBottom = new EventEmitter<boolean>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    if (event.target.scrollTop === 0) {
      this.scrollTopEvent.emit();
      this.isScrollBottom.emit(true);
    } else if (this.getScrollPos(event.target)) {
      this.isScrollBottom.emit(true);
    } else {
      this.isScrollBottom.emit(false);
    }
  }

  getScrollPos(element: any): boolean {
    return Math.abs(element.scrollTop - (element.scrollHeight - element.offsetHeight)) < 5;
  }
}
