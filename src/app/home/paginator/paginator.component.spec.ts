import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<PaginatorComponent>;
  let paginatorComponent: PaginatorComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaginatorComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PaginatorComponent);
    paginatorComponent = fixture.componentInstance;
  });

  it('should create the paginator', () => {
    expect(paginatorComponent).toBeTruthy();
  });

  describe('ngOnChanges method', () => {
    it('should not assign pageArray if changes not about totalResult', () => {
      const changes = {} as SimpleChanges;
      paginatorComponent.ngOnChanges(changes);
      expect(paginatorComponent.pagesArray).toBeFalsy();
    });

    it('should not assign pageArray if totalResult not set', () => {
      const changes = {} as SimpleChanges;
      paginatorComponent.ngOnChanges(changes);
      expect(paginatorComponent.pagesArray).toBeFalsy();
    });

    it('should assign pageArray if totalResult is set', () => {
      const changes = {} as SimpleChanges;
      changes.totalResult = {} as SimpleChange;
      changes.totalResult.currentValue = 4;
      paginatorComponent.totalResult = 4;
      paginatorComponent.ngOnChanges(changes);
      expect(paginatorComponent.pagesArray).toEqual([1]);
    });
  });

  describe('getPagesArray/getPagesNumber method', () => {
    it('should return empty if totalResult is empty', () => {
      paginatorComponent.totalResult = 0;
      expect(paginatorComponent.getPagesArray(5).length).toEqual(0);
    });

    it('should return array according to totalResult', () => {
      const expectedValues = [];
      paginatorComponent.totalResult = 60;
      for (let i = 5; i <= 20; i ++) {
        expectedValues.push(paginatorComponent.getPagesArray(i));
      }
      expect(expectedValues[0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      expect(expectedValues[1]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(expectedValues[2]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(expectedValues[3]).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(expectedValues[4]).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(expectedValues[5]).toEqual([1, 2, 3, 4, 5, 6]);
      expect(expectedValues[6]).toEqual([1, 2, 3, 4, 5, 6]);
      expect(expectedValues[7]).toEqual([1, 2, 3, 4, 5]);
      expect(expectedValues[8]).toEqual([1, 2, 3, 4, 5]);
      expect(expectedValues[9]).toEqual([1, 2, 3, 4, 5]);
      expect(expectedValues[10]).toEqual([1, 2, 3, 4]);
      expect(expectedValues[11]).toEqual([1, 2, 3, 4]);
      expect(expectedValues[12]).toEqual([1, 2, 3, 4]);
      expect(expectedValues[13]).toEqual([1, 2, 3, 4]);
      expect(expectedValues[14]).toEqual([1, 2, 3, 4]);
      expect(expectedValues[15]).toEqual([1, 2, 3]);
    });
  });

  describe('selectPage method', () => {
    it('should not fire event if selected page if page already is selected', () => {
      spyOn(paginatorComponent.selectedPageEvent, 'emit')
      paginatorComponent.selectedPage = 2;
      paginatorComponent.selectPage(2);
      expect(paginatorComponent.selectedPageEvent.emit).not.toHaveBeenCalled();
    });

    it('should fire event if new selected page ', () => {
      spyOn(paginatorComponent.selectedPageEvent, 'emit')
      paginatorComponent.selectedPage = 2;
      paginatorComponent.selectPage(3);
      expect(paginatorComponent.selectedPageEvent.emit).toHaveBeenCalledWith(3);
    });

    it('should set selected page ', () => {
      paginatorComponent.selectedPage = 2;
      paginatorComponent.selectPage(3);
      expect(paginatorComponent.selectedPage).toEqual(3);
    });
  });

  describe('getPagesExtendedSequence method', () => {
    it('should return basic extended seq sc1', () => {
      paginatorComponent.pagesArray = [1, 2, 3];
      paginatorComponent.selectedPage = 3;
      expect(paginatorComponent.getPagesExtendedSequence()).toEqual([2, 3, 4]);
    });

    it('should return basic extended seq sc2', () => {
      paginatorComponent.pagesArray = [1, 2, 3];
      paginatorComponent.selectedPage = 1;
      expect(paginatorComponent.getPagesExtendedSequence()).toEqual([2, 3, 4]);
    });

    it('should return end extended seq', () => {
      paginatorComponent.pagesArray = [1, 2, 3, 4, 5, 6];
      paginatorComponent.selectedPage = 4;
      expect(paginatorComponent.getPagesExtendedSequence()).toEqual([3, 4, 5]);
    });

    it('should return end extended seq sc 2', () => {
      paginatorComponent.pagesArray = [1, 2, 3, 4, 5, 6];
      paginatorComponent.selectedPage = 6;
      expect(paginatorComponent.getPagesExtendedSequence()).toEqual([3, 4, 5]);
    });

    it('should return middle extended seq', () => {
      paginatorComponent.pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      paginatorComponent.selectedPage = 5;
      expect(paginatorComponent.getPagesExtendedSequence()).toEqual([4, 5, 6]);
    });
  });

  describe('DOM spec', () => {
    describe('basic pages case', () => {
      beforeEach(() => {
        const changes = {} as SimpleChanges;
        changes.totalResult = {} as SimpleChange;
        changes.totalResult.currentValue = 20;
        paginatorComponent.totalResult = 20;
        paginatorComponent.ngOnChanges(changes);
        fixture.detectChanges();
      });

      it('should show nav if totalResult exist', () => {
        const navBlock = fixture.nativeElement.querySelector('nav');
        expect(navBlock).toBeTruthy();
      });

      it('should show basic pages if < 6 pages', () => {
        const ulPages = fixture.nativeElement.querySelector('.basic-pages');
        expect(ulPages).toBeTruthy();
      });

      it('should not show extended pages if < 6 pages', () => {
        const ulPages = fixture.nativeElement.querySelector('.extended-pages');
        expect(ulPages).toBeFalsy();
      });

      it('should show pages as pagesArray', () => {
        const liPages = fixture.debugElement.queryAll(By.css('.basic-pages .page-item'));
        expect(liPages.length).toEqual(4);
      });

      it('should show pages as pagesArray', () => {
        const liPagesCount = fixture.debugElement.queryAll(By.css('.basic-pages .page-item a'));
        expect(liPagesCount[0].nativeElement.textContent.trim()).toEqual('1');
        expect(liPagesCount[1].nativeElement.textContent.trim()).toEqual('2');
        expect(liPagesCount[2].nativeElement.textContent.trim()).toEqual('3');
        expect(liPagesCount[3].nativeElement.textContent.trim()).toEqual('4');
      });

      it('should add bg-primary text-light class if a selected', () => {
        paginatorComponent.selectedPage = 2;
        fixture.detectChanges();
        const liPages = fixture.debugElement.queryAll(By.css('.basic-pages .page-item a'));
        expect(liPages[1].nativeElement.classList.contains('bg-primary')).toBeTruthy();
        expect(liPages[1].nativeElement.classList.contains('text-light')).toBeTruthy();
        expect(liPages[0].nativeElement.classList.contains('bg-primary')).toBeFalsy();
        expect(liPages[0].nativeElement.classList.contains('text-light')).toBeFalsy();
        expect(liPages[2].nativeElement.classList.contains('bg-primary')).toBeFalsy();
        expect(liPages[2].nativeElement.classList.contains('text-light')).toBeFalsy();
        expect(liPages[3].nativeElement.classList.contains('text-light')).toBeFalsy();
        expect(liPages[3].nativeElement.classList.contains('text-light')).toBeFalsy();
      });

      it('should call selectPage when click on a page', () => {
        spyOn(paginatorComponent, 'selectPage');
        const selectedPage = fixture.debugElement.queryAll(By.css('.basic-pages .page-item a'))[2];
        selectedPage.nativeElement.click();
        fixture.detectChanges();
        expect(paginatorComponent.selectPage).toHaveBeenCalledOnceWith(3);
      })
    });

    describe('extended pages case', () => {
      beforeEach(() => {
        const changes = {} as SimpleChanges;
        changes.totalResult = {} as SimpleChange;
        changes.totalResult.currentValue = 32;
        paginatorComponent.totalResult = 32;
        paginatorComponent.ngOnChanges(changes);
        fixture.detectChanges();
      });

      it('should show nav if totalResult exist', () => {
        const navBlock = fixture.nativeElement.querySelector('nav');
        expect(navBlock).toBeTruthy();
      });

      describe('first page', () => {
        it('should show extended pages if >= 6 pages', () => {
          const ulPages = fixture.nativeElement.querySelector('.extended-pages');
          expect(ulPages).toBeTruthy();
        });

        it('should show first page', () => {
          const liFirstPage = fixture.debugElement.queryAll(By.css('.extended-pages .page-item'))[0];
          expect(liFirstPage.nativeElement.textContent.trim()).toEqual('1');
        });

        it('should show first page selected', () => {
          paginatorComponent.selectedPage = 1;
          fixture.detectChanges();
          const liFirstPage = fixture.debugElement.queryAll(By.css('.extended-pages .page-item a'))[0].nativeElement;
          expect(liFirstPage.classList.contains('bg-primary')).toBeTruthy();
          expect(liFirstPage.classList.contains('text-light')).toBeTruthy();
        });

        it('should select first page when click', () => {
          spyOn(paginatorComponent, 'selectPage');
          const liFirstPage = fixture.debugElement.queryAll(By.css('.extended-pages .page-item a'))[0].nativeElement;
          liFirstPage.click();
          expect(paginatorComponent.selectPage).toHaveBeenCalledWith(1);
        });
      });

      describe('ellipsis', () => {
        it('should show ellipsis start when selectedPage > 3', () => {
          paginatorComponent.selectedPage = 4;
          fixture.detectChanges();
          const liEllipsisFirst = fixture.debugElement.queryAll(By.css('.extended-pages li'))[1].nativeElement;
          expect(liEllipsisFirst.textContent.trim()).toEqual('. .');
        });

        it('should show ellipsis end when selectedPage > 3', () => {
          paginatorComponent.selectedPage = 2;
          fixture.detectChanges();
          const liEllipsisLast = fixture.debugElement.queryAll(By.css('.extended-pages li'))[4].nativeElement;
          expect(liEllipsisLast.textContent.trim()).toEqual('. .');
        });
      });

      describe('last page', () => {
        it('should show last page', () => {
          const liPageLast = fixture.debugElement.queryAll(By.css('.extended-pages li'))[5].nativeElement;
          expect(liPageLast.textContent.trim()).toEqual('7');
        });

        it('should show as selected for last page', () => {
          paginatorComponent.selectedPage = 7;
          fixture.detectChanges();
          const liPageLast = fixture.debugElement.queryAll(By.css('.extended-pages li a')).pop().nativeElement;
          expect(liPageLast.classList.contains('text-light')).toBeTruthy();
          expect(liPageLast.classList.contains('bg-primary')).toBeTruthy();
        });

        it('should call select for last page', () => {
          paginatorComponent.selectedPage = 7;
          spyOn(paginatorComponent, 'selectPage');
          fixture.detectChanges();
          const liPageLast = fixture.debugElement.queryAll(By.css('.extended-pages li a')).pop().nativeElement;
          liPageLast.click();
          expect(paginatorComponent.selectPage).toHaveBeenCalledWith(7);
        });
      })

      describe('pageextended sequences', () => {
        it('should show pages extended sc 1', () => {
          const liPagesExtended = fixture.debugElement.queryAll(By.css('.extended-pages li a'));
          expect(liPagesExtended[1].nativeElement.textContent.trim()).toEqual('2');
          expect(liPagesExtended[2].nativeElement.textContent.trim()).toEqual('3');
          expect(liPagesExtended[3].nativeElement.textContent.trim()).toEqual('4');
        });

        it('should show pages extended sc 2', () => {
          paginatorComponent.selectedPage = 7;
          fixture.detectChanges();
          const liPagesExtended = fixture.debugElement.queryAll(By.css('.extended-pages li a'));
          expect(liPagesExtended[1].nativeElement.textContent.trim()).toEqual('4');
          expect(liPagesExtended[2].nativeElement.textContent.trim()).toEqual('5');
          expect(liPagesExtended[3].nativeElement.textContent.trim()).toEqual('6');
        });

        it('should show pages extended sc 3', () => {
          paginatorComponent.selectedPage = 4;
          fixture.detectChanges();
          const liPagesExtended = fixture.debugElement.queryAll(By.css('.extended-pages li a'));
          expect(liPagesExtended[1].nativeElement.textContent.trim()).toEqual('3');
          expect(liPagesExtended[2].nativeElement.textContent.trim()).toEqual('4');
          expect(liPagesExtended[3].nativeElement.textContent.trim()).toEqual('5');
        });

        it('should add class for selected page', () => {
          paginatorComponent.selectedPage = 4;
          fixture.detectChanges();
          const liPageExtended = fixture.debugElement.queryAll(By.css('.extended-pages li a'))[2].nativeElement;
          expect(liPageExtended.classList.contains('bg-primary')).toBeTruthy();
          expect(liPageExtended.classList.contains('text-light')).toBeTruthy();
        });

        it('should call selectPage', () => {
          spyOn(paginatorComponent, 'selectPage');
          const liPageExtended = fixture.debugElement.queryAll(By.css('.extended-pages li a'))[2].nativeElement;
          liPageExtended.click();
          fixture.detectChanges();
          expect(paginatorComponent.selectPage).toHaveBeenCalledWith(3);
        });
      });
    });
  });
});
